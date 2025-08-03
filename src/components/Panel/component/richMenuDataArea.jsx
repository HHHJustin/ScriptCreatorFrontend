import { DataAreaWrapper, Th, Tr, Td, Table, CenteredTd, StyledButton, StyledSelect } from "../modalStyle";
import { useParams } from "react-router-dom";
import { useState } from "react";

const columns = [
    { key: 'id', label: '編號', align: 'center', width: '20%' },
    { key: 'menu', label: '圖文選單', align: 'center', width: '60%' },
    { key: "action", label: "動作", align: "center", width: "20%" },
];

const RichMenuDataArea = ({ node, messages, richMenus, onRefresh }) => {
    const { channel } = useParams();
    const currentIDInt = parseInt(node.id, 10);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const allData = Array.isArray(messages)
    ? messages
        .filter(item => typeof item.Index === 'number')
        .map(({ Index, RichMenuChoice }) => ({
            id: Index,
            richMenuChoiceID: RichMenuChoice?.RichMenuChoiceID || '—',
            richMenuID: RichMenuChoice.RichMenuID,
        }))
    : [];

    const handleSubmit = async () => {
        try {
          const res = await fetch(`/api/${channel}/richMenus/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentNodeID: currentIDInt})
          });
          if (res.ok) {
            onRefresh && onRefresh();
          } else alert('建立失敗');
        } catch (err) {
          console.error('Error:', err);
          alert('建立失敗');
        }
    };
    const handleDelete = async (item) => {
        if (!window.confirm('確定要刪除這筆訊息嗎？')) return;
        try {
            const res = await fetch(`/api/${channel}/richMenus/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                richMenuChoiceID: item.richMenuChoiceID,
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
    const handleUpdate = async (item, richMenuID) => {
        try {
          const res = await fetch(`/api/${channel}/richMenus/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                richMenuChoiceID: item.richMenuChoiceID,
                richMenuID: richMenuID,
            }),
          });
          
          if (res.ok) {
            onRefresh && onRefresh();
          } else {
            const errorText = await res.text();
            console.error('更新失敗:', errorText);
            alert(`更新失敗：\n${errorText}`);
          }
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
                    <CenteredTd>
                        <StyledSelect 
                        value={item.richMenuID} 
                        onChange={(e) => handleUpdate(item, parseInt(e.target.value))}
                        >
                            <option value="">請選擇</option>
                            {richMenus.map(richMenu => (
                                <option key={richMenu.id} value={richMenu.id}>
                                    {richMenu.name}
                                </option>
                        ))}
                        </StyledSelect>
                    </CenteredTd>
                    <Td style={{ textAlign: 'center' }}>
                            <StyledButton onClick={() => handleDelete(item)}>刪除</StyledButton>
                    </Td>
                </Tr>
            ))}
            <Tr>
                <CenteredTd>New</CenteredTd>
                <CenteredTd />
                <CenteredTd>
                    <StyledButton onClick={handleSubmit}>建立</StyledButton>
                </CenteredTd>
            </Tr>
            </tbody>
        </Table>
        </DataAreaWrapper>
    );
};

export default RichMenuDataArea;