import { useState, useEffect } from "react";
import { Popup, PopupContent, TextArea, FileInput, TableContainer, Table, Button } from "../style";

const RichMenuTable = ({ richMenus, channel, onRefresh }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [menuName, setMenuName] = useState('');
  const [jsonContent, setJsonContent] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [editingMenu, setEditingMenu] = useState(null);

  const handleAddNewMenu = async () => {
    try {
      const res = await fetch(`/api/${channel}/setting/richMenus/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menuName: menuName })
      });
      if (res.ok) {
        setMenuName('');
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
    setEditingMenu(menu);
    setMenuName(menu.name);
    setJsonContent(menu.json || ''); 
    setImageFile(null);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setEditingMenu(null);
    setMenuName('');
    setJsonContent('');
    setImageFile(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowPopup(false);
        setEditingMenu(null); // 如果你有編輯狀態
      }
    };
  
    if (showPopup) {
      window.addEventListener('keydown', handleKeyDown);
    }
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showPopup]);

  const handleUpdateRichMenu = async (id, name, json) => {
    if (name.trim() === '') return;
  
    const formData = new FormData();
    formData.append('menuID', id);
    formData.append('menuName', name);
    formData.append('richMenuJson', json);
    console.log("handleUpdateRichMenu");
    if (imageFile) {
      formData.append('file', imageFile);
    }
  
    try {
      const res = await fetch(`/api/${channel}/setting/richMenus/update`, {
        method: 'POST',
        body: formData,
      });
  
      if (res.ok) {
        setEditingMenu(null);
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

  const handleDeleteRichMenu = async (id) => {
    if (!window.confirm('確定要刪除這筆訊息嗎？')) return;
    try {
      const res = await fetch(`/api/${channel}/setting/richMenus/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menuID: id })
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    console.log('上傳的圖片:', file);
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
          {richMenus.length > 0 ? (
            richMenus.map((menu, index) => (
              <tr key={menu.id}>
                <td>{index + 1}</td>
                <td onClick={() => handleEditClick(menu)} style={{ cursor: 'pointer', color: '#1890ff' }}>
                  {menu.name}
                </td>
                <td>
                  <Button onClick={() => handleEditClick(menu)}>編輯</Button>
                </td>
                <td>
                  <Button onClick={() => handleDeleteRichMenu(menu.id)}>刪除</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">尚未圖文選單</td>
            </tr>
          )}
          <tr>
            <td>建立新資料</td>
            <td></td>
            <td>
              <Button onClick={handleAddNewMenu}>創建</Button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </Table>

      {/* Popup Form */}
      {showPopup && editingMenu && (
        <Popup>
          <PopupContent>
            <label htmlFor="menuName">輸入圖文選單名稱:</label>
            <input
              type="text"
              id="menuName"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
            />

            <h3>輸入 JSON 格式</h3>
            <TextArea
              id="jsonContent"
              value={jsonContent}
              onChange={(e) => setJsonContent(e.target.value)}
              rows="10"
              placeholder="Enter JSON here"
            />

            <h3>選擇圖片</h3>
            <FileInput type="file" accept="image/*" onChange={handleImageUpload} />
            <Button onClick={() => handleUpdateRichMenu(editingMenu.id, menuName, jsonContent)}> 儲存 </Button>
            <Button onClick={handlePopupClose}>關閉</Button>
          </PopupContent>
        </Popup>
      )}
    </TableContainer>
  );
};

export default RichMenuTable;