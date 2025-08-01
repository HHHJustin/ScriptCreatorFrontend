import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { StyledButton, EditableTextArea } from '../modalStyle';
import EditableTable from './editableTable';

const QuickReplyDataArea = ({ node, message, onRefresh }) => {
  const { channel } = useParams();
  const currentIDInt = parseInt(node.id, 10);
  const [editing, setEditing] = useState({ index: null, field: null, value: '' });

  const allData = Array.isArray(message)
    ? message.filter(item => typeof item.Index === 'number').map(({ Index, QuickReply }) => ({
        id: Index,
        buttonName: QuickReply?.ButtonName || '—',
        reply: QuickReply?.Reply || '—',
        quickReplyID: QuickReply.QuickReplyID,
      }))
    : [];

  const handleCreate = async () => {
    const res = await fetch(`/api/${channel}/quickReplies/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentNodeID: currentIDInt })
    });
    if (res.ok) onRefresh && onRefresh();
    else alert('建立失敗');
  };

  const handleDelete = async (row) => {
    if (!window.confirm('確定要刪除嗎？')) return;
    const res = await fetch(`/api/${channel}/quickReplies/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quickReplyID: row.quickReplyID,
        currentNodeID: currentIDInt,
      })
    });
    if (res.ok) onRefresh && onRefresh();
    else alert('刪除失敗');
  };

  const handleUpdate = async (row, field) => {
    setEditing({ index: null, field: null, value: '' });
    const res = await fetch(`/api/${channel}/quickReplies/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quickReplyID: row.quickReplyID,
        field,
        value: editing.value,
      })
    });
    if (res.ok) onRefresh && onRefresh();
    else alert('更新失敗');
  };

  const columns = [
    { key: 'id', label: '編號', align: 'center', width: '20%' },
    { 
      key: 'buttonName', 
      label: '按鈕', 
      align: 'center', 
      width: '30%',
      render: (row) =>
        editing.index === row.id && editing.field === 'buttonName' ? (
          <EditableTextArea
            value={editing.value}
            onChange={(e) => setEditing({ ...editing, value: e.target.value })}
            onBlur={() => handleUpdate(row, 'buttonName')}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleUpdate(row, 'buttonName'))}
          />
        ) : (
          <span onClick={() => setEditing({ index: row.id, field: 'buttonName', value: row.buttonName })}>
            {row.buttonName}
          </span>
        )
    },
    { 
      key: 'reply', 
      label: '回覆', 
      align: 'center', 
      width: '30%',
      render: (row) =>
        editing.index === row.id && editing.field === 'reply' ? (
          <EditableTextArea
            value={editing.value}
            onChange={(e) => setEditing({ ...editing, value: e.target.value })}
            onBlur={() => handleUpdate(row, 'reply')}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleUpdate(row, 'reply'))}
          />
        ) : (
          <span onClick={() => setEditing({ index: row.id, field: 'reply', value: row.reply })}>
            {row.reply}
          </span>
        )
    },
    { 
      key: 'action', 
      label: '動作', 
      align: 'center', 
      width: '20%',
      render: (row) => <StyledButton onClick={() => handleDelete(row)}>刪除</StyledButton>
    },
  ];

  return <EditableTable columns={columns} data={allData} onCreate={handleCreate} createText="建立" />;
};

export default QuickReplyDataArea;
