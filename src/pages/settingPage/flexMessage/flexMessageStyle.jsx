import { useState } from "react";
import { Popup, PopupContent, TextArea, FileInput, TableContainer, Table, Button } from "../settingstyle";

const FlexMessageTable = ({ flexMessages, onEdit, onDelete, onAddNew }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [menuName, setMenuName] = useState('');
  const [jsonContent, setJsonContent] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleAddNewMenu = () => {
    setShowPopup(true);
  };

  const handleSaveJson = () => {
    // 處理 JSON 儲存邏輯
    console.log('JSON 儲存:', jsonContent);
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
          {flexMessages.length > 0 ? (
            flexMessages.map((menu, index) => (
              <tr key={menu.id}>
                <td>{index + 1}</td>
                <td onClick={() => onEdit(menu.id)} style={{ cursor: 'pointer', color: '#1890ff' }}>
                  {menu.name}
                </td>
                <td>
                  <Button onClick={() => onEdit(menu.id)}>編輯</Button>
                </td>
                <td>
                  <Button onClick={() => onDelete(menu.id)}>刪除</Button>
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
              <Button onClick={handleAddNewMenu}>創建</Button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </Table>

      {/* Popup Form */}
      {showPopup && (
        <Popup>
          <PopupContent>
            <label htmlFor="menuName">輸入彈性模板名稱:</label>
            <input
              type="text"
              id="menuName"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
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
            <button onClick={handleSaveJson}>儲存 JSON</button>

            <h3>選擇圖片</h3>
            <FileInput
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <button onClick={() => console.log('上傳圖片', imageFile)}>上傳圖片</button>

            <button onClick={handlePopupClose}>關閉</button>
          </PopupContent>
        </Popup>
      )}
    </TableContainer>
  );
};

export default FlexMessageTable;