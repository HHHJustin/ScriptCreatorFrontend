import React, { useState } from 'react';
import { TableContainer, Table, Button, Input } from '../style';

const TagTable = ({ tags, channel, onRefresh }) => {
  const [newTagName, setNewTagName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');

  const handleAddTag = async () => {
    try {
      const res = await fetch(`/api/${channel}/tagNodes/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tagName: newTagName })
      });
      if (res.ok) {
        setNewTagName('');
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

  const handleDeleteTag = async (id) => {
    if (!window.confirm('確定要刪除這筆訊息嗎？')) return;
    try {
      const res = await fetch(`/api/${channel}/tagNodes/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tagID: id })
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

  const handleUpdateTag = async (id, name) => {
    if (name.trim() === '') return;
    try {
      const res = await fetch(`/api/${channel}/tagNodes/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tagID: id, tagName: name })
      });
      if (res.ok) {
        setEditingId(null);
        setEditedName('');
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
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th>編號</th>
            <th>標籤</th>
            <th>動作</th>
          </tr>
        </thead>
        <tbody>
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <tr key={tag.id}>
                <td>{index + 1}</td>
                <td onClick={() => {
                  setEditingId(tag.id);
                  setEditedName(tag.name);
                }}>
                  {editingId === tag.id ? (
                    <Input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      onBlur={() => handleUpdateTag(tag.id, editedName)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleUpdateTag(tag.id, editedName);
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    tag.name
                  )}
                </td>
                <td>
                  <Button onClick={() => handleDeleteTag(tag.id)}>刪除</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">尚未建立任何標籤</td>
            </tr>
          )}

          <tr>
            <td>New</td>
            <td>
              <Input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="輸入新標籤"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
            </td>
            <td>
              <Button onClick={handleAddTag}>建立</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default TagTable;
