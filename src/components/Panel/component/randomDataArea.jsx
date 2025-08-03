import { DataAreaWrapper, Table, Th, Tr, Td, CenteredTd, StyledButton, EditableTextArea } from "../modalStyle";
import { useState } from "react";
import { useParams } from "react-router-dom";

const columns = [
    { key: "id", label: "編號", align: "center", width: "20%" },
    { key: "randomID", label: "情形", align: "center", width: "20%" }, // 原本是 condition → 修正為 randomID
    { key: "weight", label: "權重", align: "center", width: "20%" },
    { key: "action", label: "動作", align: "center", width: "25%" },
    { key: "extra", label: "前往", align: "center", width: "15%" }
  ];
  
  export const RandomDataArea = ({ node, onGoNext, message, onRefresh }) => {
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [editedContent, setEditedContent] = useState("");
    const [draggedIndex, setDraggedIndex] = useState(null);
    const { channel } = useParams();
    const currentIDInt = parseInt(node.id, 10);
    const allData = Array.isArray(message)
    ? message
        .filter((item) => typeof item.Index === "number")
        .map(({ Index, Random }) => ({
        id: Index,
        randomID: Random?.RandomID,
        weight: Random?.Weight,
        condition: Random?.Condition || "-",
        }))
    : [];
    
    const handleSubmit = async () => {
      try {
        const res = await fetch(`/api/${channel}/randoms/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentNodeID: currentIDInt })
        });
        if (res.ok) {
          onRefresh && onRefresh();
        } else {
          alert("建立失敗");
        }
      } catch (err) {
        console.error("Error:", err);
        alert("建立失敗");
      }
    };
    const handleUpdateContent = async (item, field) => {
        setEditingIndex(null);
        setEditingField(null);
        try {
            const res = await fetch(`/api/${channel}/randoms/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                randomID: item.randomID,
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

    const handleDelete = async (item) => {
        if (!window.confirm('確定要刪除這筆訊息嗎？')) return;
        try {
          const res = await fetch(`/api/${channel}/randoms/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                randomID: item.randomID,
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
                onDrop={() => handleDrop(rowIndex)}
                style={{ textAlign: col.align, width: col.width }}>
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
                    {editingIndex === item.id && editingField === 'condition'
                    ? <EditableTextArea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        onBlur={() => handleUpdateContent(item, "condition")}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleUpdateContent(item, "condition"))}
                        />
                    : <span onClick={() => {
                        setEditingIndex(item.id);
                        setEditingField('condition');
                        setEditedContent(item.condition);
                        }}>
                        {item.condition}
                        </span>
                    }
                </Td>
                <Td style={{ textAlign: 'center' }}>
                    {editingIndex === item.id && editingField === 'weight'
                    ? <EditableTextArea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        onBlur={() => handleUpdateContent(item, "weight")}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleUpdateContent(item, "weight"))}
                        />
                    : <span onClick={() => {
                        setEditingIndex(item.id);
                        setEditingField('weight');
                        setEditedContent(item.weight);
                        }}>
                        {item.weight}
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
  
  export default RandomDataArea;