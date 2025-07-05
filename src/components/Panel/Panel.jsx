import React, { useState, useEffect } from 'react';
import ReactFlow, { Background, applyEdgeChanges, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import { SelectBoxMenuWrapper, SelectBoxMenuItem } from './panelStyle';
import { ContextMenu, MenuItem, SubMenu, SubMenuItem } from '../nodes/indexNodeStyle';
import { options } from '../nodes/indexTypeData';
import { renderModalByType } from './madalRender';
import { handleCreateNodeClick } from './hook/panel';
import { useParams, useNavigate } from 'react-router-dom';
import { useOnRefreshGraph } from '../../pages/routerPage/hooks/homepage';

const Panel = ({ nodes, setNodes, onNodesChange, edges, 
  setEdges, onConnect, setBarMenuOpen, 
  nodeTypes, edgeTypes, viewport, setViewport, tagList, onRefreshTags }) => {
  const [selectedNodes, setSelectedNodes] = useState([]);
  // const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [panelMenuVisible, setPanelMenuVisible] = useState(false);
  const [panelMenuPosition, setPanelMenuPosition] = useState({ x: 0, y: 0 });
  const [editNode, setEditNode] = useState(null); 
  const { screenToFlowPosition } = useReactFlow();
  const navigate = useNavigate();

  const handlePaneRightClick = (e) => {
    e.preventDefault();
    const pos = screenToFlowPosition({ x: e.clientX, y: e.clientY });
    setPanelMenuPosition(pos); 
    setBarMenuOpen(false);
    // setMenuVisible(false);
    setPanelMenuVisible(true);
    setPanelMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const handleContextMenu = (e) => {
    if (e.target.classList.contains('react-flow__pane')) return;
    e.preventDefault();
    if (selectedNodes.length > 0) {
      setPanelMenuVisible(false);
      // setMenuVisible(true);
      setMenuPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleEditNode = (data, id) => {
    setEditNode({ data, id });  
  };

  const handleCloseModal = async () => {
    if (!editNode) return;
  
    try {
      const res = await fetch(`/api/${channel}/${editNode.id}/title`);
      const data = await res.json();
      setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === editNode.id
          ? { ...node, data: { ...node.data, title: data.Title ?? node.data.title } }
          : node
      )
    );
    } catch (err) {
      console.error('關閉 modal 時同步 title 失敗', err);
    }
  
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
    const { channel } = useParams();
    const onRefreshGraph = useOnRefreshGraph(channel, setNodes, setEdges);

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
        edges={edges.map(edge => ({
          ...edge,
          data: {
            ...edge.data,
            sourceHandle: edge.sourceHandle, 
            setEdges,
            onRefreshGraph,
          },
        }))}
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
          // setMenuVisible(false);
          setPanelMenuVisible(false);
        }}
        onMoveEnd={(event, transform) => {
          setViewport(transform);
        }}
        onPaneClick={() => {
          // setMenuVisible(false);
          setPanelMenuVisible(false);
          setBarMenuOpen(false);
        }}
        defaultViewport={viewport}
      >
        <Background color="#ddd" gap={20} size={1} variant="lines" />
      </ReactFlow>

      {panelMenuVisible && (
        <ContextMenu $x={panelMenuPosition.x} $y={panelMenuPosition.y}>
          <MenuItem>
            <span>新增點</span>    
            <span>▶︎</span>      
            <SubMenu>
              {Object.entries(options).map(([label, value]) => (
                <SubMenuItem
                  key={value}
                  onClick={() => handleCreateNodeClick(value, panelMenuPosition.x - 300, panelMenuPosition.y - 500, channel, navigate)}
                >
                  {label}
                </SubMenuItem>
              ))}
            </SubMenu>
          </MenuItem>
        </ContextMenu>
      )}
      {renderModalByType(editNode, setNodes, tagList, handleCloseModal, onRefreshTags)}
    </div>
  );
};

export default Panel;
