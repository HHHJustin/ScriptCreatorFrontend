import React, { useState, useEffect } from 'react';
import ReactFlow, { Background, applyEdgeChanges, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
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
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });      // 螢幕座標 (Menu 用)
  const [flowPosition, setFlowPosition] = useState({ x: 0, y: 0 });      // Flow 座標 (新增 Node 用)
  const [panelMenuVisible, setPanelMenuVisible] = useState(false);
  const [editNode, setEditNode] = useState(null); 
  const { screenToFlowPosition } = useReactFlow();
  const [prevOptions, setPrevOptions] = useState(null);
  const navigate = useNavigate();
  const { channel } = useParams();
  const onRefreshGraph = useOnRefreshGraph(channel, setNodes, setEdges);

  // 右鍵空白處
  const handlePaneRightClick = (e) => {
    e.preventDefault();
    const flowPos = screenToFlowPosition({ x: e.clientX, y: e.clientY }); // Flow 內座標
    setFlowPosition(flowPos);
    setMenuPosition({ x: e.clientX, y: e.clientY }); // 螢幕座標
    setBarMenuOpen(false);
    setPanelMenuVisible(true);
  };

  // 節點右鍵
  const handleContextMenu = (e) => {
    if (e.target.classList.contains('react-flow__pane')) return;
    e.preventDefault();
    if (selectedNodes.length > 0) {
      setPanelMenuVisible(false);
      setMenuPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleEditNode = (data, id) => setEditNode({ data, id });
  // 共用跳轉：根據節點 ID 打開 Modal

  const goToNode = (targetNodeID) => {
    const target = nodes.find(n => parseInt(n.id) === targetNodeID);
    if (target) {
      setEditNode({ data: target.data, id: target.id });
    } else {
      alert("找不到對應節點");
    }
  };
  
  const handleNavigateModal = (direction, e) => {
    if (!editNode) return;
  
    const currentNode = nodes.find(n => n.id === editNode.id);
    if (!currentNode) return;
  
    let targetId = null;
    if (direction === 'next') {
      targetId = currentNode.data.nextnode;
    } 

    if (direction === 'prev') {
      const targets = currentNode.data.previousnodes || [];
      if (targets.length === 0) return;
      setPrevOptions({
        x: e.clientX, // 用事件座標
        y: e.clientY,
        options: targets
      });
      return; // 避免繼續執行
    }
  
    if (!targetId || targetId === 0) return;
  
    const targetNode = nodes.find(n => parseInt(n.id) === targetId);
    if (targetNode) {
      setEditNode({ data: targetNode.data, id: targetNode.id });
    }
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
    const handleKeyDown = (e) => e.key === 'Shift' && document.body.classList.add('shift-pressed');
    const handleKeyUp = (e) => e.key === 'Shift' && document.body.classList.remove('shift-pressed');
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
          data: { ...node.data, onEdit: handleEditNode }
        }))}
        edges={edges.map(edge => ({
          ...edge,
          data: { ...edge.data, sourceHandle: edge.sourceHandle, setEdges, onRefreshGraph }
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
        onMove={() => setPanelMenuVisible(false)}
        onMoveEnd={(event, transform) => setViewport(transform)}
        onPaneClick={() => { setPanelMenuVisible(false); setBarMenuOpen(false); }}
        defaultViewport={viewport}
      >
        <Background color="#ddd" gap={20} size={1} variant="lines" />
      </ReactFlow>

      {panelMenuVisible && (
        <ContextMenu $x={menuPosition.x} $y={menuPosition.y}>
          <MenuItem>
            <span>新增點</span>    
            <span>▶︎</span>      
            <SubMenu>
              {Object.entries(options).map(([label, value]) => (
                <SubMenuItem
                  key={value}
                  onClick={() => handleCreateNodeClick(value, flowPosition.x, flowPosition.y, channel, navigate)}
                >
                  {label}
                </SubMenuItem>
              ))}
            </SubMenu>
          </MenuItem>
        </ContextMenu>
      )}
      {renderModalByType(
        editNode, 
        setNodes, 
        tagList,
        handleCloseModal, 
        onRefreshTags,
        handleNavigateModal,
        goToNode
      )}
      {prevOptions && (
        <ContextMenu 
          $x={prevOptions.x} 
          $y={prevOptions.y} 
          style={{ zIndex: 10001, position: 'fixed' }}
        >
          {prevOptions.options.map(id => {
            const target = nodes.find(n => parseInt(n.id) === id);
            return (
              <MenuItem
                key={id}
                onClick={() => {
                  setEditNode({ data: target.data, id: target.id });
                  setPrevOptions(null);
                }}
              >
                {target?.data?.title || `節點 ${id}`}
              </MenuItem>
            );
          })}
          <MenuItem onClick={() => setPrevOptions(null)}>取消</MenuItem>
        </ContextMenu>
      )}


    </div>
  );
};

export default Panel;
