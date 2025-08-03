import React, { useState, useEffect } from 'react';
import { Popup, PopupContent, FileInput, TableContainer, Table, Button, Input } from '../style';

const UploadImageTable = ({ images, channel, onRefresh }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [imageName, setImageName] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [editingImage, setEditingImage] = useState(null);

    const handleAddNewImage = async () => {
        try {
          const res = await fetch(`/api/${channel}/setting/uploadImages/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageName: imageName })
          });
          if (res.ok) {
            setImageName('');
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

    const handleEditClick = (image) => {
        if (image.name && image.name.trim() !== '') {
            return;
        }
        setEditingImage(image);
        setImageName(image.name);
        setImageFile(null);
        setShowPopup(true);
      };
    
      const handlePopupClose = () => {
        setShowPopup(false);
        setEditingImage(null);
        setImageName('');
        setImageFile(null);
      };
    
      useEffect(() => {
        const handleKeyDown = (e) => {
          if (e.key === 'Escape') {
            setShowPopup(false);
            setEditingImage(null); // 如果你有編輯狀態
          }
        };
      
        if (showPopup) {
          window.addEventListener('keydown', handleKeyDown);
        }
      
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [showPopup]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        console.log('上傳的圖片:', file);
    };

    const handleDeleteImage = async (id) => {
        if (!window.confirm('確定要刪除這筆訊息嗎？')) return;
        try {
            const res = await fetch(`/api/${channel}/setting/uploadImages/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageID: id })
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

    const handleUploadImage = async (id, name) => {
    if (name.trim() === '' || !imageFile) return;

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('imageID', id);
    formData.append('imageName', name);

    try {
        const res = await fetch(`/api/${channel}/setting/uploadImages/update`, {
        method: 'POST',
        body: formData,
        });

        if (res.ok) {
        setEditingImage(null);
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

    const CopyImageLink = async(id) => {
        try {
            const res = await fetch(`/api/${channel}/setting/uploadImages/${id}/getImageID`);
            const data = await res.json();
            if (data.imageLink) {
                await navigator.clipboard.writeText(data.imageLink);
                alert("✅ imageLink 已複製到剪貼簿！");
            } else {
                alert("❌ 沒有取得 imageLink");
            }
        } catch (err) {
            console.error("❌ 複製失敗:", err);
            alert("複製失敗");
        }
    }

    return (
        <TableContainer>
            <Table>
            <thead>
                <tr>
                    <th>編號</th>
                    <th>名稱</th>
                    <th>動作</th>
                    <th>刪除</th>
                </tr>
            </thead>
            <tbody>
            {images.length > 0 ? (
                images.map((image, index) => (
                <tr key={image.id}>
                    <td>{index + 1}</td>
                    <td onClick={() => handleEditClick(image)} style={{ cursor: 'pointer', color: '#1890ff' }}>
                    {image.name}
                    </td>
                    <td>
                        <Button onClick={() => CopyImageLink(image.id)}>複製連結</Button>
                    </td>
                    <td>
                        <Button onClick={() => handleDeleteImage(image.id)}>刪除</Button>
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
                <Button onClick={() => handleAddNewImage()}>創建</Button>
                </td>
                <td></td>
            </tr>
            </tbody>
        </Table>
        {/* Popup Form */}
        {showPopup && editingImage && (
            <Popup>
            <PopupContent>
                <label htmlFor="imageName">輸入圖片名稱:</label>
                <input
                    type="text"
                    id="imageName"
                    value={imageName}
                    onChange={(e) => setImageName(e.target.value)}
                />

                <h3>選擇圖片</h3>
                <FileInput type="file" accept="image/*" onChange={handleImageUpload} />
                <Button onClick={() => handleUploadImage(editingImage.id, imageName)}> 儲存 </Button>
                <Button onClick={handlePopupClose}>關閉</Button>
            </PopupContent>
            </Popup>
        )}
        </TableContainer>
    )
};

export default UploadImageTable;
