// components/DataArea.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  DataAreaWrapper, Table, Th, Td, Tr, CenteredTd, EditableTextArea,
  StyledSelect, StyledButton, MediaContainer, MediaFileName
} from '../modalStyle';


const columns = [
  { key: 'id', label: '編號', align: 'center', width: '15%' },
  { key: 'type', label: '種類', align: 'center', width: '15%' },
  { key: 'content', label: '內容', align: 'center', width: '55%' },
  { key: 'action', label: '動作', align: 'center', width: '15%' },
];


const MediaContent = ({ item, uploadMedia }) => (
  <MediaContainer>
    <StyledButton onClick={() => uploadMedia(item)}>上傳</StyledButton>
    {item.content && (
      <MediaFileName>{item.content.split(';')[0]}</MediaFileName>
    )}
  </MediaContainer>
);

const MessageDataArea = ({ node, message, onRefresh }) => {
  const [newType, setNewType] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const { channel } = useParams();
  const currentIDInt = parseInt(node.id, 10);

  const allData = Array.isArray(message)
    ? message
    .filter(item => typeof item.Index === 'number')
    .map(({ Index, Message }) => ({
        id: Index,
        rawType: Message?.Type || '',
        type: typeToChinese(Message?.Type),
        content: Message?.Content?.trim() || '—',
        messageID: Message?.MessageID || 0,
      }))
    : [];

  const handleSubmit = async () => {
    if (!newType) return alert('請選擇訊息種類');
    try {
      const res = await fetch(`/api/${channel}/messages/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentNodeID: currentIDInt, messageType: newType })
      });
      if (res.ok) {
        setNewType('');
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
      const res = await fetch(`/api/${channel}/messages/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageID: item.messageID,
          currentNodeID: currentIDInt,
          messageIndex: item.id,
          messageType: item.rawType,
          messageContent: item.content
        })
      });
      if (res.ok) onRefresh && onRefresh();
      else alert('刪除失敗');
    } catch (err) {
      console.error('刪除錯誤:', err);
      alert('刪除失敗');
    }
  };

  const handleUpdateContent = async (item) => {
    setEditingIndex(null);
    if (item.content === editedContent) return;
    try {
      const res = await fetch(`/api/${channel}/messages/update/text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageID: item.messageID,
          currentNodeID: currentIDInt,
          messageType: item.rawType,
          messageContent: editedContent
        })
      });
      if (res.ok) onRefresh && onRefresh();
      else alert('更新失敗');
    } catch (err) {
      console.error('更新錯誤:', err);
      alert('更新失敗');
    }
  };

  const uploadMedia = (item) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = item.rawType === 'Image' ? 'image/*' : 'video/*';
    
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('messageID', item.messageID);
      formData.append('currentNodeID', currentIDInt);
      formData.append('messageType', item.rawType); // 'Image' or 'Video'
  
      try {
        const response = await fetch(`/api/${channel}/messages/update/media`, {
          method: 'POST',
          body: formData, 
        });
  
        if (response.ok) {
          onRefresh && onRefresh();
        } else {
          const errorText = await response.text();
          console.error('更新失敗:', errorText);
          alert(`上傳失敗：\n${errorText}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('上傳失敗');
      }
    };
  
    input.click();
  };
  

  return (
    <DataAreaWrapper>
      <Table>
        <thead>
          <tr>{columns.map(col => (
            <Th key={col.key} style={{ textAlign: col.align, width: col.width }}>{col.label}</Th>
          ))}</tr>
        </thead>
        <tbody>
          {allData.map(item => (
            <Tr key={item.id}>
              {columns.map(col => (
                <Td key={col.key} style={{ textAlign: col.align, width: col.width }}>
                  {col.key === 'content' ? (
                    item.rawType === 'Image' || item.rawType === 'Video'
                      ? <MediaContent item={item} uploadMedia={uploadMedia} />
                      : editingIndex === item.id
                        ? <EditableTextArea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            onBlur={() => handleUpdateContent(item)}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleUpdateContent(item))}
                          />
                        : <span onClick={() => { setEditingIndex(item.id); setEditedContent(item.content); }}>
                            {item.content}
                          </span>
                  ) : col.key === 'action' ? (
                    <StyledButton onClick={() => handleDelete(item)}>刪除</StyledButton>
                  ) : item[col.key]}
                </Td>
              ))}
            </Tr>
          ))}
          <Tr>
            <CenteredTd>New</CenteredTd>
            <CenteredTd>
              <StyledSelect value={newType} onChange={(e) => setNewType(e.target.value)}>
                <option value=""> - </option>
                <option value="Text">文字</option>
                <option value="Image">圖片</option>
                <option value="Video">影片</option>
              </StyledSelect>
            </CenteredTd>
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

export default MessageDataArea;

const typeToChinese = (type) => {
  switch (type) {
    case 'Text': return '文字';
    case 'Image': return '圖片';
    case 'Video': return '影片';
    default: return '未知';
  }
};