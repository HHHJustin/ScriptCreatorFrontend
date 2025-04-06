import React, { useState, useEffect } from 'react';
import ReactFlow, { Background, applyEdgeChanges } from 'reactflow';  // <<< 加 applyEdgeChanges
import 'reactflow/dist/style.css';
import { SelectBoxMenuWrapper, SelectBoxMenuItem } from './panelStyle';

const Panel = ({ nodes, setNodes, onNodesChange, edges, 
  setEdges, onConnect, setBarMenuOpen, 
  nodeTypes, edgeTypes, viewport, setViewport }) => {
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const handlePaneClick = () => {
    setBarMenuOpen(false);
    setMenuVisible(false);
  };

  const handleContextMenu = (e) => {
    if (e.target.classList.contains('react-flow__pane')) {
      return;
    }
    if (selectedNodes.length > 0) {
      e.preventDefault();
      setMenuPosition({ x: e.clientX, y: e.clientY });
      setMenuVisible(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Shift') {
        setIsShiftPressed(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Shift') {
        setIsShiftPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }} onContextMenu={handleContextMenu}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={(changes) => setEdges((eds) => applyEdgeChanges(changes, eds))}  
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={[20, 20]}
        onPaneClick={handlePaneClick}
        panOnDrag
        selectionOnDrag={false}
        selectionKeyCode="Shift"
        onSelectionChange={(e) => setSelectedNodes(e.nodes || [])}
        onMove={() => setMenuVisible(false)}
        onMoveEnd={(event, transform) => {
          setViewport(transform);  
        }}
        defaultViewport={viewport} 
      >
        <Background color="#ddd" gap={20} size={1} variant="lines" />
      </ReactFlow>

      {menuVisible && (
        <SelectBoxMenuWrapper style={{ top: menuPosition.y, left: menuPosition.x }}>
          <SelectBoxMenuItem onClick={() => console.log('刪除')}>刪除這些點</SelectBoxMenuItem>
          <SelectBoxMenuItem onClick={() => console.log('複製')}>複製這些點</SelectBoxMenuItem>
        </SelectBoxMenuWrapper>
      )}
    </div>
  );
};

export default Panel;
