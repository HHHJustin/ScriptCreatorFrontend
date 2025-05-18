import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  DataAreaWrapper, Table, Th, Td, Tr, CenteredTd,
  StyledButton, EditableTextArea,
} from '../modalStyle';

const columns = [
    { key: 'id', label: '編號', align: 'center', width: '20%' },
    { key: 'button', label: '按鈕', align: 'center', width: '30%' },
    { key: 'reply', label: '回覆', align: 'center', width: '30%' },
    { key: 'action', label: '動作', align: 'center', width: '20%' },
];

const QuickReplyDataArea = ({ node, message, onRefresh }) => {
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [editedContent, setEditedContent] = useState('');
    const { channel } = useParams();
    const currentIDInt = parseInt(node.id, 10);
    const allData = Array.isArray(message)
    ? message
        .filter(item => typeof item.Index === 'number')
        .map(({ Index, QuickReply }) => ({
            id: Index,
            buttonName: QuickReply?.ButtonName || '—',
            reply: QuickReply?.Reply || '—',
            quickReplyID: QuickReply.QuickReplyID,
        }))
    : [];
    const handleCreateQuickReply = async () => {
        try {
            const res = await fetch(`/api/${channel}/quickReplies/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentNodeID: currentIDInt })
            });
            if (res.ok) { 
                onRefresh && onRefresh();
            } else {
                const errorText = await res.text(); // 👈 這裡讀取 response body（可以改用 json()）
                console.error('API 錯誤訊息:', errorText);
                alert(`建立失敗：\n${errorText}`);
            }

        } catch (err) {
            console.error('Error:', err);
            alert('建立失敗');
        }
    };
  
    const handleDelete = async (item) => {
        if (!window.confirm('確定要刪除這筆訊息嗎？')) return;
        try {
            const res = await fetch(`/api/${channel}/quickReplies/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                quickReplyID: item.quickReplyID,
                currentNodeID: currentIDInt,
            })
            });
            if (res.ok) { 
                onRefresh && onRefresh();
            } else {
                const errorText = await res.text(); // 👈 這裡讀取 response body（可以改用 json()）
                console.error('API 錯誤訊息:', errorText);
                alert(`建立失敗：\n${errorText}`);
            }
        } catch (err) {
            console.error('刪除錯誤:', err);
            alert('刪除失敗');
        }
    };

    const handleUpdateContent = async (item, field) => {
        setEditingIndex(null);
        setEditingField(null);
        try {
            const res = await fetch(`/api/${channel}/quickReplies/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                quickReplyID: item.quickReplyID,
                field: field,
                value: editedContent,
            })
            });
            if (res.ok) onRefresh && onRefresh();
            else alert('更新失敗');
        } catch (err) {
            console.error('更新錯誤:', err);
            alert('更新失敗');
        }
    };

    if (!allData || !Array.isArray(allData)) {
        return <div>沒有資料</div>;
    }

    return (
        <DataAreaWrapper>
        <Table>
            <thead>
            <tr>
                {columns.map((col) => (
                <Th key={col.key}>
                    {col.label}
                </Th>
                ))}
            </tr>
            </thead>
            <tbody>
            {allData.map((item) => (
                <Tr key={item.id}>
                    <Td style={{ textAlign: 'center' }}>{item.id}</Td>
                    <Td style={{ textAlign: 'center' }}>
                        {editingIndex === item.id && editingField === 'buttonName'
                        ? <EditableTextArea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            onBlur={() => handleUpdateContent(item, "buttonName")}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleUpdateContent(item, "buttonName"))}
                            />
                        : <span onClick={() => {
                            setEditingIndex(item.id);
                            setEditingField('buttonName');
                            setEditedContent(item.buttonName);
                            }}>
                            {item.buttonName}
                            </span>
                        }
                    </Td>
                    <Td style={{ textAlign: 'center' }}>
                        {editingIndex === item.id && editingField === 'reply'
                        ? <EditableTextArea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            onBlur={() => handleUpdateContent(item, "reply")}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleUpdateContent(item, "reply"))}
                            />
                        : <span onClick={() => {
                            setEditingIndex(item.id);
                            setEditingField('reply');
                            setEditedContent(item.reply);
                            }}>
                            {item.reply}
                            </span>
                        }
                    </Td>
                    <Td style={{ textAlign: 'center' }}>
                        <StyledButton onClick={() => handleDelete(item)}>刪除</StyledButton>
                    </Td>
                </Tr>
            ))}
             <Tr>
            <CenteredTd>New</CenteredTd>
            <CenteredTd />
            <CenteredTd>
              <StyledButton onClick={handleCreateQuickReply}>建立</StyledButton>
            </CenteredTd>
            <CenteredTd />
          </Tr>
            </tbody>
        </Table>
        </DataAreaWrapper>
    );
};


export default QuickReplyDataArea;