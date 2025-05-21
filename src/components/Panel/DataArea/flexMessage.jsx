import { DataAreaWrapper, Table, Td, Th, Tr, CenteredTd, StyledButton, StyledSelect } from "../modalStyle";
import { useState } from "react";
import { useParams } from "react-router-dom";

const columns = [
    { key: 'id', label: '編號', align: 'center', width: '20%' },
    { key: 'message', label: '訊息', align: 'center', width: '60%' },
    { key: 'action', label: '動作', align: 'center', width: '20%' },
];

export const FlexMessageDataArea = ({ node, message, flexMessages, onRefresh }) => {
    const currentIDInt = parseInt(node.id, 10);
    const { channel } = useParams();
    const allData = Array.isArray(message)
    ? message
        .filter(item => typeof item.Index === 'number')
        .map(({ Index, FlexMessageChoice }) => ({
            id: Index,
            flexMessageID: FlexMessageChoice?.FlexMessageID || '—',
            flexMessageChoiceID: FlexMessageChoice?.FlexMessageChoiceID,
        }))
    : [];

    const handleSubmit = async () => {
        try {
                const res = await fetch(`/api/${channel}/flexMessages/create`, {
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
            const res = await fetch(`/api/${channel}/flexMessages/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                flexMessageChoiceID: item.flexMessageChoiceID,
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

    const handleUpdateFlexMessage = async (item, value) => {
        try {
          const res = await fetch(`/api/${channel}/flexMessages/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                flexMessageID: value,
                flexMessageChoiceID: item.flexMessageChoiceID,
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
                    <CenteredTd>
                        <StyledSelect 
                        value={item.flexMessageID} 
                        onChange={(e) => handleUpdateFlexMessage(item, parseInt(e.target.value))}
                        >
                            <option value="">請選擇</option>
                            {flexMessages.map(flexMessage => (
                                <option key={flexMessage.id} value={flexMessage.id}>
                                    {flexMessage.name}
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

export default FlexMessageDataArea;