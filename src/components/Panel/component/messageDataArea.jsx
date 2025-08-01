// components/DataArea.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  DataAreaWrapper, Table, Th, Td, Tr, CenteredTd, EditableTextArea,
  StyledSelect, StyledButton, MediaContainer, MediaFileName
} from '../modalStyle';
import {compressImage, compressVideo} from '../hook/compress.js'

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
    input.accept = item.rawType === 'image' ? 'image/*' : 'video/*';
  
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      document.getElementById('progressText').innerText = "壓縮中...";
      let processedFile = file;
  
      if (item.rawType === 'image') {
        processedFile = await compressImage(file);
      } else if (item.rawType === 'video') {
        processedFile = await compressVideo(file);
      }
  
      const formData = new FormData();
      formData.append('file', processedFile, file.name);
      formData.append('messageID', item.messageID);
      formData.append('currentNodeID', currentIDInt);
      formData.append('messageType', item.rawType);
  
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `/api/${channel}/messages/update/media`);
  
      // 上傳進度
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = (event.loaded / event.total) * 100;
          document.getElementById('progressBar').style.width = percent + "%";
          document.getElementById('progressText').innerText = `上傳中 ${percent.toFixed(1)}%`;
        }
      };
  
      xhr.onload = () => {
        if (xhr.status === 200) {
          document.getElementById('progressText').innerText = "上傳完成，後端處理中…";
          onRefresh && onRefresh();
        } else {
          alert(`上傳失敗：\n${xhr.responseText}`);
        }
      };
  
      xhr.onerror = () => alert("上傳失敗");
      xhr.send(formData);
    };
  
    input.click();
  };
  
  document.body.insertAdjacentHTML('beforeend', `
  <div style="width:80%;margin:10px auto;">
    <div style="background:#ccc;height:20px;border-radius:10px;overflow:hidden;">
      <div id="progressBar" style="background:#4caf50;width:0;height:100%;"></div>
    </div>
    <div id="progressText" style="text-align:center;margin-top:5px;">等待上傳</div>
  </div>
  `);

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
