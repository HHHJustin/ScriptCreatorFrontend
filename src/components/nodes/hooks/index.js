import { useState } from 'react';
import { useReactFlow } from 'reactflow';
import { useParams } from 'react-router-dom';

export const useNodeActions = (data, id) => {
  const { channel } = useParams();
  const { setNodes } = useReactFlow();
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleTriangleClick = async () => {
    if (!isOpen) {
      try {
        const res = await fetch(`/api/${channel}/${id}/fetchInfo`);
        const result = await res.json();
        setMessages(result);

        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === id
              ? { ...node, style: { ...node.style, zIndex: 1000 } }
              : node
          )
        );
      } catch (err) {
        console.error('Failed to fetch node info:', err);
      }
    } else {
      setMessages([]);
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? { ...node, style: { ...node.style, zIndex: undefined } }
            : node
        )
      );
    }

    setIsOpen(prev => !prev);
  };

  return { messages, isOpen, handleTriangleClick };
};

export const navigateByNodeType = (type, navigate) => {
  switch (type) {
    case '訊息':
      navigate('/message');
      break;
    case '關鍵字判定':
      navigate('/keyword');
      break;
    case '快速回覆':
      navigate('/quickreply');
      break;
    case '標籤判定':
      navigate('/tagdecision');
      break;
    case '標籤操作':
      navigate('/tagoperation');
      break;
    case '隨機':
      navigate('/random');
      break;
    case '圖文選單':
      navigate('/richmenu');
      break;
    case '彈性模板':
      navigate('/flexmessage');
      break;
    default:
      console.warn('未知類型，無法導航：', type);
  }
};

export const handleMenuClick = (action) => {
  setMenuVisible(false);
  if (action === '編輯') {
    if(data.onEdit){
      data.onEdit(data, id); 
    }
  }
};

export const handleContextMenu = (e) => {
  e.preventDefault();
  const offsetX = 0;
  const offsetY = 0;
  const maxX = window.innerWidth - 150;
  const maxY = window.innerHeight - 150;

  let x = e.clientX + offsetX;
  let y = e.clientY + offsetY;

  if (x > maxX) x = maxX;
  if (y > maxY) y = maxY;

  setMenuVisible(true);
  setMenuPosition({ x, y });
};