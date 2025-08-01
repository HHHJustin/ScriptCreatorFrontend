import { StyledButton, EditableTextArea } from "../modalStyle";
import { useParams } from "react-router-dom";
import { useState } from "react";
import EditableTable from "./editableTable";

const KeywordDecisionDataArea = ({ node, onGoNext, message, onRefresh }) => {
  const { channel } = useParams();
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const currentIDInt = parseInt(node.id, 10);

  const keywordList = message?.KeywordDecisions || [];
  const allData = keywordList
    .filter(item => typeof item?.Index === 'number' && item?.KeywordDecision)
    .map(({ Index, KeywordDecision }) => ({
      id: Index,
      keyword: KeywordDecision.Keyword || '—',
      keywordDecisionID: KeywordDecision.KWDecisionID,
    }));

  const handleCreate = async () => {
    const res = await fetch(`/api/${channel}/keywordDecisions/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentNodeID: currentIDInt })
    });
    if (res.ok) onRefresh && onRefresh();
    else alert('建立失敗');
  };

  const handleDelete = async (row) => {
    if (!window.confirm('確定要刪除這筆訊息嗎？')) return;
    const res = await fetch(`/api/${channel}/keywordDecisions/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        keywordDecisionID: row.keywordDecisionID,
        currentNodeID: currentIDInt,
      })
    });
    if (res.ok) onRefresh && onRefresh();
    else alert('刪除失敗');
  };

  const handleUpdate = async (row) => {
    setEditingIndex(null);
    if (row.keyword === editedContent) return;
    const res = await fetch(`/api/${channel}/keywordDecisions/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        keywordDecisionID: row.keywordDecisionID,
        Keyword: editedContent,
      })
    });
    if (res.ok) onRefresh && onRefresh();
    else alert('更新失敗');
  };

  const columns = [
    { key: 'id', label: '編號', align: 'center', width: '10%' },
    { 
      key: 'keyword', 
      label: '關鍵字', 
      align: 'center', 
      width: '50%',
      render: (row) =>
        editingIndex === row.id ? (
          <EditableTextArea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onBlur={() => handleUpdate(row)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleUpdate(row))}
          />
        ) : (
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setEditingIndex(row.id);
              setEditedContent(row.keyword);
            }}
          >
            {row.keyword}
          </span>
        ),
    },
    { 
      key: 'action', 
      label: '動作', 
      align: 'center', 
      width: '25%',
      render: (row) => <StyledButton onClick={() => handleDelete(row)}>刪除</StyledButton>
    },
    { 
      key: 'extra', 
      label: '前往', 
      align: 'center', 
      width: '15%',
      render: (row) => <StyledButton onClick={() => onGoNext(row.id)}>▶︎</StyledButton>
    },
  ];

  return (
    <EditableTable 
      columns={columns}
      data={allData}
      onCreate={handleCreate}
      onDelete={handleDelete}
      addButtonText="建立"
    />
  );
};

export default KeywordDecisionDataArea;
