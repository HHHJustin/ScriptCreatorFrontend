import { getBezierPath } from 'reactflow';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const EdgeContextMenu = styled.div`
  position: fixed;
  top: ${({ $y }) => $y}px;
  left: ${({ $x }) => $x}px;
  width: 120px;
  height: 40px;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  border-radius: 6px;
  z-index: 2000;
  font-size: 14px;
  color: #333;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const CustomEdge = ({
  id,
  source,
  target,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  markerEnd,
  data,
}) => {
  const { channel } = useParams();
  const [contextMenu, setContextMenu] = useState(null);

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const { setEdges, onRefreshGraph, sourceHandle } = data || {};
  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };
  const handleDelete = async () => {
    try {
      await fetch(`/api/${channel}/disconnect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceId: source,
          sourceHandle: sourceHandle || null,
          targetId: target,
        }),
      });
      setEdges?.((prev) => prev.filter((edge) => edge.id !== id));
      setContextMenu(null);
      if (onRefreshGraph) {
        onRefreshGraph();
      }
    } catch (err) {
      console.error('❌ 無法刪除 edge:', err);
    }
  };

  useEffect(() => {
    const clearMenu = () => setContextMenu(null);
    if (contextMenu) {
      document.addEventListener('click', clearMenu);
    }
    return () => {
      document.removeEventListener('click', clearMenu);
    };
  }, [contextMenu]);

  return (
    <>
      <path
        d={edgePath}
        fill="none"
        stroke="#1ebb11"
        strokeWidth={1}
        strokeDasharray="5 5"
        markerEnd={markerEnd}
        style={{ animation: 'dashmove 1s linear infinite' }}
      />
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={15}
        onContextMenu={handleContextMenu}
        style={{ cursor: 'pointer' }}
      />
      {contextMenu &&
        createPortal(
          <EdgeContextMenu $x={contextMenu.x} $y={contextMenu.y} onClick={handleDelete}>
            刪除連結
          </EdgeContextMenu>,
          document.body
        )}
    </>
  );
};

export default CustomEdge;
