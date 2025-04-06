import { useState } from 'react';
import { useReactFlow } from 'reactflow';

export function useNodeActions(data, id) {
  const { setNodes } = useReactFlow();
  const [messages, setMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleTriangleClick = () => {
    setIsOpen((prev) => {
      if (!prev) {
        setMessage(data.content);
        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === id
              ? { ...node, style: { ...node.style, zIndex: 1000 } }
              : node
          )
        );
      } else {
        setMessage(null);
        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === id
              ? { ...node, style: { ...node.style, zIndex: undefined } }
              : node
          )
        );
      }
      return !prev;
    });
  };

  return { messages, isOpen, handleTriangleClick };
}

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
