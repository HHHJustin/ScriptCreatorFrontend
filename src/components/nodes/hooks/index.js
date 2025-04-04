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
