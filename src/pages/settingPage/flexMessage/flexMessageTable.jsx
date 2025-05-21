import { useState, useEffect } from "react";
import { Popup, PopupContent, TextArea, FileInput, TableContainer, Table, Button } from "../style";

const FlexMessageTable = ({ flexMessages, channel, onRefresh}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [flexMessageName, setFlexMessageName] = useState('');
  const [jsonContent, setJsonContent] = useState('');
  const [editingMessage, setEditingMessage] = useState(null);

  const handleAddNewFlexMessage = async () => {
    try {
      const res = await fetch(`/api/${channel}/setting/flexMessagesEdit/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flexMessageName: flexMessageName })
      });
      if (res.ok) {
        setFlexMessageName('');
        onRefresh && onRefresh();
      } else {
        const errorText = await res.text();
        console.error('API 錯誤訊息:', errorText);
        alert(`建立失敗：\n${errorText}`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('建立失敗');
    }
  };

  const handleEditClick = (menu) => {
    setEditingMessage(menu);
    setFlexMessageName(menu.name);
    setJsonContent(menu.json || ''); 
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setEditingMessage(null);
    setFlexMessageName('');
    setJsonContent('');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowPopup(false);
        setEditingMessage(null); // 如果你有編輯狀態
      }
    };
    if (showPopup) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showPopup]);

  const handleUpdateFlexMessage = async (id, name, json) => {
    if (name.trim() === '') return;
    try {
      const res = await fetch(`/api/${channel}/setting/flexMessagesEdit/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flexMessageID: id,
          flexMessageName: name,
          flexMessageJson: json,
        }),
      });
      if (res.ok) {
        setEditingMessage(null);
        setShowPopup(false);
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

  const handleDeleteFlexMessage = async (id) => {
    if (!window.confirm('確定要刪除這筆訊息嗎？')) return;
    try {
      const res = await fetch(`/api/${channel}/setting/flexMessagesEdit/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flexMessageID: id })
      });
      if (res.ok) {
        onRefresh && onRefresh();
      } else {
        const errorText = await res.text();
        console.error('API 錯誤訊息:', errorText);
        alert(`刪除失敗：\n${errorText}`);
      }
    } catch (err) {
      console.error('刪除錯誤:', err);
      alert('刪除失敗');
    }
  };
  
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th>編號</th>
            <th>名稱</th>
            <th>編輯</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody>
          {flexMessages.length > 0 ? (
            flexMessages.map((menu, index) => (
              <tr key={menu.id}>
                <td>{index + 1}</td>
                <td onClick={() => handleEditClick(menu)} style={{ cursor: 'pointer', color: '#1890ff' }}>
                  {menu.name}
                </td>
                <td>
                  <Button onClick={() => handleEditClick(menu)}>編輯</Button>
                </td>
                <td>
                  <Button onClick={() => handleDeleteFlexMessage(menu.id)}>刪除</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">尚未彈性模板</td>
            </tr>
          )}
          <tr>
            <td>建立新資料</td>
            <td></td>
            <td>
              <Button onClick={handleAddNewFlexMessage}>創建</Button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </Table>

      {/* Popup Form */}
      {showPopup && (
        <Popup>
          <PopupContent>
            <label htmlFor="flexMessageName">輸入彈性模板名稱:</label>
            <input
              type="text"
              id="flexMessageName"
              value={flexMessageName}
              onChange={(e) => setFlexMessageName(e.target.value)}
              placeholder="Enter name here"
            />
            <h3>輸入 JSON 格式</h3>
            <TextArea
              id="jsonContent"
              value={jsonContent}
              onChange={(e) => setJsonContent(e.target.value)}
              rows="10"
              placeholder="Enter JSON here"
            />
            <button onClick={() => handleUpdateFlexMessage(editingMessage.id, flexMessageName, jsonContent)}>儲存</button>

            <button onClick={handlePopupClose}>關閉</button>
          </PopupContent>
        </Popup>
      )}
    </TableContainer>
  );
};

export default FlexMessageTable;