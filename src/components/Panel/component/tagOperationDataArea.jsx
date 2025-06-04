import { DataAreaWrapper, Table, Th, Tr, Td, CenteredTd, StyledSelect,
    StyledButton } from "../modalStyle";
import { useParams } from "react-router-dom";
import { useState } from "react";

const columns = [
    { key: 'id', label: '編號', align: 'center', width: '20%' },
    { key: 'operation', label: '動作', align: 'center', width: '20%' },
    { key: 'tag', label: '標籤', align: 'center', width: '40%' },
    { key: 'action', label: '動作', align: 'center', width: '20%' },
  ];

const TagOperationDataArea = ({ node, messages, tags, onRefresh }) => {
    const { channel } = useParams();
    const currentIDInt = parseInt(node.id, 10);
    const allData = Array.isArray(messages)
    ? messages
        .filter(item => typeof item.Index === 'number')
        .map(({ Index, TagOperation }) => ({
            id: Index,
            tagName: TagOperation?.TagName || '—',
            operationType: TagOperation.OperationType || '—',
            tagOperationID: TagOperation.TagOperationID,
        }))
    : [];
    const handleSubmit = async () => {
        try {
          const res = await fetch(`/api/${channel}/tagOperations/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentNodeID: currentIDInt })
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
            const res = await fetch(`/api/${channel}/tagOperations/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tagOperationID: item.tagOperationID,
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
    const handleUpdateTag = async (item, field, value) => {
        try {
          const res = await fetch(`/api/${channel}/tagOperations/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              tagOperationID: item.tagOperationID,
              field: field, 
              value: value,
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
                    <CenteredTd>
                        <StyledSelect 
                            value={item.operationType}
                            onChange={(e) => handleUpdateTag(item, "OperationType", e.target.value)}>
                            <option value="">請選擇操作</option>
                            <option value="Add">新增</option>
                            <option value="Remove">刪除</option>
                        </StyledSelect>
                      </CenteredTd>
                    <CenteredTd>
                        <StyledSelect 
                            value={item.tagName} 
                            onChange={(e) => handleUpdateTag(item, "TagName", e.target.value)}
                          >
                            <option value="">請選擇標籤</option>
                            {tags.map(tag => (
                            <option key={tag.id} value={tag.id}>
                                {tag.name}
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
                <CenteredTd/>
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

export default TagOperationDataArea;