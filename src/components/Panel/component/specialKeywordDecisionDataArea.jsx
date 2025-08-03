import { DataAreaWrapper, Table, Th, Tr, Td, BranchGoNextNode, EditableTextArea,
  CenteredTd, StyledButton, StyledSelect} from "../modalStyle";
import { useParams } from "react-router-dom";
import { useState } from "react";


const columns = [
  { key: 'id', label: '編號', align: 'center', width: '20%' },
  { key: 'type', label: '種類', align: 'center', width: '20%' },
  { key: 'keyword', label: '關鍵字', align: 'center', width: '30%' },
  { key: 'action', label: '動作', align: 'center', width: '25%' },
  { key: 'extra', label: '前往', align: 'center', width: '15%' },
];

const SpecialKeywordDecisionDataArea = ({ node, onGoNext, message, onRefresh }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [draggedIndex, setDraggedIndex] = useState(null);
  const { channel } = useParams();
  const currentIDInt = parseInt(node.id, 10);
  const allData = Array.isArray(message)
  ? message
      .filter(item => typeof item.Index === 'number')
      .map(({ Index, SpecialKeyword }) => ({
          id: Index,
          type: SpecialKeyword?.Type || '',
          keyword: SpecialKeyword?.Keyword || '—',
          specialKeywordID: SpecialKeyword?.SpecialKeywordID,
      }))
  : [];

const handleSubmit = async () => {
  try {
    const res = await fetch(`/api/${channel}/specialKeywordDecisions/create`, {
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
  if (!window.confirm('確定要刪除這筆訊息嗎？')) return;
  try {
    const res = await fetch(`/api/${channel}/specialKeywordDecisions/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          specialKeywordID: item.specialKeywordID,
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

  const handleUpdateContent = async (item, field, value = editedContent) => {
    setEditingIndex(null);
    if ((field === "keyword" && item.keyword === value) || (field === "type" && item.type === value)) return;
    try {
      const res = await fetch(`/api/${channel}/specialKeywordDecisions/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            specialKeywordID: item.specialKeywordID,
            field: field,
            value: value,
        })
      });
      if (res.ok) onRefresh && onRefresh();
      else alert('更新失敗');
    } catch (err) {
      console.error('更新錯誤:', err);
      alert('更新失敗');
    }
  };

    // ---------- 拖曳 ----------
    const handleDragStart = (index) => setDraggedIndex(index);
    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = async (index) => {
      if (draggedIndex === null || draggedIndex === index) return;

      // 交換位置的資訊
      const payload = {
        currentNodeID: currentIDInt,
        draggedIndex: draggedIndex,  // 直接用 rowIndex
        newIndex: index              // 直接用目標 rowIndex
      };
    
      try {
        const res = await fetch(`/api/${channel}/update-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('更新順序失敗');
        onRefresh && onRefresh();
      } catch (err) {
        alert(err.message);
      } finally {
        setDraggedIndex(null);
      }
    };
    return (
      <DataAreaWrapper>
        <Table>
        <thead>
            <tr>
              {columns.map((col) => (
                <Th key={col.key}
                onDragStart={() => handleDragStart(rowIndex)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(rowIndex)}>
                  {col.label}
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
          {allData.map((item) => (
            <Tr key={item.id}>
              <Td style={{ textAlign: 'center' }}>{item.id}</Td>
              <CenteredTd>
              <StyledSelect 
                  value={item.type || ''}
                  onChange={(e) => handleUpdateContent(item, "type", e.target.value)}
                >
                  <option value="">請選擇操作</option>
                  <option value="user">單一玩家</option>
                  <option value="group">群組</option>
              </StyledSelect>
              </CenteredTd>
              <Td style={{ textAlign: 'center' }}>
                {editingIndex === item.id && editingField === 'keyword' ? (
                  <EditableTextArea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    onBlur={() => handleUpdateContent(item, "keyword", editedContent)} // 傳入 editedContent
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleUpdateContent(item, "keyword", editedContent); // 傳入 editedContent
                      }
                    }}
                  />
                ) : (
                  <span
                    onClick={() => {
                      setEditingIndex(item.id);
                      setEditingField('keyword');
                      setEditedContent(item.keyword);
                    }}
                  >
                    {item.keyword}
                  </span>
                )}
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
  
  export default SpecialKeywordDecisionDataArea;