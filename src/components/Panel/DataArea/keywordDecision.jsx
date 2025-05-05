import { DataAreaWrapper, Table, Th, Tr, Td, StyledButton, StyledTextArea } from "../modalStyle";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState } from "react";

const CenteredTd = styled(Td)`
  vertical-align: middle;
  text-align: center;
`;

const EditableTextArea = ({ value, onChange, onBlur, onKeyDown }) => (
  <StyledTextArea
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    onKeyDown={onKeyDown}
    autoFocus
  />
);

export const KeywordDecisionDataArea = ({ node, onGoNext, message, onRefresh }) => {
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedContent, setEditedContent] = useState('');
    const { channel } = useParams();
    const currentIDInt = parseInt(node.id, 10);
    const allData = Array.isArray(message.KeywordDecisions)
    ? message.KeywordDecisions
        .filter(item => typeof item.Index === 'number')
        .map(({ Index, KeywordDecision }) => ({
            id: Index,
            keyword: KeywordDecision?.Keyword || '—',
            keywordDecisionID: KeywordDecision?.KWDecisionID,
        }))
    : [];
  const columns = [
    { key: 'id', label: '編號', align: 'center', width: '10%' },
    { key: 'keyword', label: '關鍵字', align: 'center', width: '50%' },
    { key: 'action', label: '動作', align: 'center', width: '25%' },
    { key: 'extra', label: '前往', align: 'center', width: '15%' },
  ];

  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/${channel}/keywordDecisions/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentNodeID: currentIDInt })
      });
      if (res.ok) onRefresh && onRefresh();
      else alert('建立失敗');
    } catch (err) {
      console.error('Error:', err);
      alert('建立失敗');
    }
  };
  
  const handleDelete = async (item) => {
    console.log(item);
    if (!window.confirm('確定要刪除這筆訊息嗎？')) return;
    try {
      const res = await fetch(`/api/${channel}/keywordDecisions/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            keywordDecisionID: item.keywordDecisionID,
            currentNodeID: currentIDInt,
        })
      });
      if (res.ok) onRefresh && onRefresh();
      else alert('刪除失敗');
    } catch (err) {
      console.error('刪除錯誤:', err);
      alert('刪除失敗');
    }
  };

  const handleUpdateContent = async (item) => {
    setEditingIndex(null);
    if (item.keyword === editedContent) return;
    try {
      const res = await fetch(`/api/${channel}/keywordDecisions/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            keywordDecisionID: item.keywordDecisionID,
            Keyword: editedContent,
        })
      });
      if (res.ok) onRefresh && onRefresh();
      else alert('更新失敗');
    } catch (err) {
      console.error('更新錯誤:', err);
      alert('更新失敗');
    }
  };

  return (
    <DataAreaWrapper>
      <Table>
        <thead>
          <tr>
            {columns.map((col) => (
              <Th key={col.key} style={{ textAlign: col.align, width: col.width }}>
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
                {editingIndex === item.id
                  ? <EditableTextArea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      onBlur={() => handleUpdateContent(item)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleUpdateContent(item))}
                    />
                  : <span onClick={() => {
                      setEditingIndex(item.id);
                      setEditedContent(item.keyword);
                    }}>
                      {item.keyword}
                    </span>
                }
              </Td>
              <Td style={{ textAlign: 'center' }}>
                <StyledButton onClick={() => handleDelete(item)}>刪除</StyledButton>
              </Td>
              <Td style={{ textAlign: 'center' }}>
                <StyledButton onClick={() => onGoNext(item.id)}>▶︎</StyledButton>
              </Td>
            </Tr>
          ))}
          <Tr>
            <CenteredTd>New</CenteredTd>
            <CenteredTd />
            <CenteredTd>
              <StyledButton onClick={handleSubmit}>建立</StyledButton>
            </CenteredTd>
            <CenteredTd />
          </Tr>
        </tbody>
      </Table>
    </DataAreaWrapper>
  );
};

export default KeywordDecisionDataArea;
