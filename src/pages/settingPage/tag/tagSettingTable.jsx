import React from 'react';
import { TableContainer, Table, Button, Input } from '../style';

// 組件
const TagTable = ({ tags, onAddTag, onDeleteTag, onEditTag }) => {
  const [newTagName, setNewTagName] = React.useState('');

  const handleAddTag = () => {
    if (newTagName.trim()) {
      onAddTag(newTagName.trim());
      setNewTagName('');
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
                <td onClick={() => onEditTag(tag.id)} style={{ cursor: 'pointer', color: '#1890ff' }}>
                  {tag.name}
                </td>
                <td>
                  <Button onClick={() => onDeleteTag(tag.id)}>刪除</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">尚未建立任何標籤</td>
            </tr>
          )}

          {/* 新增新標籤 */}
          <tr>
            <td>New</td>
            <td>
              <Input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="輸入新標籤"
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
