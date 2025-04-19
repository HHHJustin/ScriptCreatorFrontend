import React, { useState, useEffect } from 'react';
import ReactFlow, { Background, applyEdgeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import { SelectBoxMenuWrapper, SelectBoxMenuItem } from './panelStyle';
import { ContextMenu, MenuItem, SubMenu, SubMenuItem } from '../nodes/indexNodeStyle';
import { options } from '../nodes/indexTypeData';
import { renderModalByType } from './madalRender';

const Panel = ({ nodes, setNodes, onNodesChange, edges, 
  setEdges, onConnect, setBarMenuOpen, 
  nodeTypes, edgeTypes, viewport, setViewport, tagList }) => {

  const [selectedNodes, setSelectedNodes] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [panelMenuVisible, setPanelMenuVisible] = useState(false);
  const [panelMenuPosition, setPanelMenuPosition] = useState({ x: 0, y: 0 });
  const [editNode, setEditNode] = useState(null); 

  const handlePaneRightClick = (e) => {
    e.preventDefault();
    setBarMenuOpen(false);
    setMenuVisible(false);
    setPanelMenuVisible(true);
    setPanelMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const handleContextMenu = (e) => {
    if (e.target.classList.contains('react-flow__pane')) return;
    e.preventDefault();
    if (selectedNodes.length > 0) {
      setPanelMenuVisible(false);
      setMenuVisible(true);
      setMenuPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleEditNode = (data, id) => {
    setEditNode({ data, id });  
  };

  const handleCloseModal = () => {
    setEditNode(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Shift') document.body.classList.add('shift-pressed');
    };
    const handleKeyUp = (e) => {
      if (e.key === 'Shift') document.body.classList.remove('shift-pressed');
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
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            onEdit: handleEditNode,  
          }
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={(changes) => setEdges((eds) => applyEdgeChanges(changes, eds))}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={[20, 20]}
        onPaneContextMenu={handlePaneRightClick}
        panOnDrag
        selectionOnDrag={false}
        selectionKeyCode="Shift"
        onSelectionChange={(e) => setSelectedNodes(e.nodes || [])}
        onMove={() => {
          setMenuVisible(false);
          setPanelMenuVisible(false);
        }}
        onMoveEnd={(event, transform) => {
          setViewport(transform);
        }}
        onPaneClick={() => {
          setMenuVisible(false);
          setPanelMenuVisible(false);
          setBarMenuOpen(false);
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

      {panelMenuVisible && (
        <ContextMenu $x={panelMenuPosition.x} $y={panelMenuPosition.y}>
          <MenuItem>
            <span>新增點</span>    
            <span>▶︎</span>      
            <SubMenu>
              {Object.entries(options).map(([label, value]) => (
                <SubMenuItem key={value} onClick={() => console.log(value)}>
                  {label}
                </SubMenuItem>
              ))}
            </SubMenu>
          </MenuItem>
        </ContextMenu>
      )}
      {renderModalByType(editNode, tagList, handleCloseModal)}
    </div>
  );
};

export default Panel;
