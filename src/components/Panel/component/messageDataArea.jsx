import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  DataAreaWrapper, Table, Th, Td, Tr, CenteredTd, EditableTextArea,
  StyledSelect, StyledButton, MediaContainer, MediaFileName
} from '../modalStyle';

const columns = [
  { key: 'id', label: '編號', align: 'center', width: '15%' },
  { key: 'type', label: '種類', align: 'center', width: '25%' },
  { key: 'content', label: '內容', align: 'center', width: '40%' },
  { key: 'action', label: '動作', align: 'center', width: '20%' },
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
  const [draggedIndex, setDraggedIndex] = useState(null);
  const { channel } = useParams();
  const currentIDInt = parseInt(node.id, 10);

  const allData = Array.isArray(message)
    ? message.map((item) => ({
        id: item.index,
        rawType: item.type,
        type: typeToChinese(item.type),
        messageID: item.messageId,
        content:
          item.type === 'text'
            ? (item.text?.trim() || '—')
            : item.type === 'image' || item.type === 'video'
            ? `${item.fileName || ''};${item.fileURL || ''}`
            : '—',
      }))
    : [];

  // ---------- 建立 ----------
  const handleSubmit = async () => {
    if (!newType) return alert('請選擇訊息種類');
    const res = await fetch(`/api/${channel}/messages/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentNodeID: currentIDInt, messageType: newType })
    });
    if (res.ok) {
      setNewType('');
      onRefresh && onRefresh();
    } else alert('建立失敗');
  };

  // ---------- 刪除 ----------
  const handleDelete = async (item) => {
    if (!window.confirm('確定要刪除這筆訊息嗎？')) return;
    const res = await fetch(`/api/${channel}/messages/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messageID: item.messageID,
        currentNodeID: currentIDInt,
        messageType: item.rawType,
        messageContent: JSON.stringify({ fileURL: item.content.split(';')[1] })
      })
    });
    if (res.ok) onRefresh && onRefresh();
    else alert('刪除失敗');
  };

  // ---------- 更新文字 ----------
  const handleUpdateContent = async (item) => {
    setEditingIndex(null);
    if (item.content === editedContent) return;
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
  };

  // ---------- 上傳圖片/影片 ----------
  const uploadMedia = (item) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = item.rawType === 'image' ? 'image/*' : 'video/*';
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('messageID', item.messageID);
      formData.append('currentNodeID', currentIDInt);
      formData.append('messageType', item.rawType);
      const res = await fetch(`/api/${channel}/messages/update/media`, { method: 'POST', body: formData });
      if (res.ok) onRefresh && onRefresh();
      else alert('上傳失敗');
    };
    input.click();
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
          <tr>{columns.map(col => (
            <Th key={col.key} style={{ textAlign: col.align, width: col.width }}>{col.label}</Th>
          ))}</tr>
        </thead>
        <tbody>
          {allData.map((item, rowIndex) => (
            <Tr key={item.id}
              draggable
              onDragStart={() => handleDragStart(rowIndex)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(rowIndex)}
              style={{ cursor: "move", backgroundColor: draggedIndex === rowIndex ? "#f0f0f0" : "white" }}
            >
              {columns.map(col => (
                <Td key={col.key} style={{ textAlign: col.align, width: col.width }}>
                  {col.key === 'content' ? (
                    item.rawType === 'image' || item.rawType === 'video'
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
                <option value="text">文字</option>
                <option value="image">圖片</option>
                <option value="video">影片</option>
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
  switch (type?.toLowerCase()) {
    case 'text': return '文字';
    case 'image': return '圖片';
    case 'video': return '影片';
    default: return '未知';
  }
};
