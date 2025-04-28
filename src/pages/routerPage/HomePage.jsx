
import React, { useState, useCallback, useEffect } from 'react';
import { useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import Navbar from '../../components/header/navbar';
import Panel from '../../components/Panel/Panel';
import IndexNode from '../../components/nodes/indexNode';
import CustomEdge from '../../components/edge/edge';
import { useParams } from 'react-router-dom';
import { updateNodeLocation, createOnConnect, createOnNodesChange, fetchGraphData } from './hooks/homepage';


const nodeTypes = {
  indexNode: IndexNode,
};
  
const edgeTypes = {
  customEdge: CustomEdge,
};

const nodeConfig = [
  { id: '1', title: '訊息節點', type: '訊息', position: { x: 100, y: 100 }, key: 'message', tags: '標籤1, 標籤2' },
  { id: '2', title: '關鍵字節點', type: '關鍵字判定', position: { x: 300, y: 100 }, key: 'keyword' ,tags: '標籤1, 標籤2'},
  { id: '3', title: '快速回覆節點', type: '快速回覆', position: { x: 500, y: 100 }, key: 'quickReply', tags:'標籤1' },
  { id: '4', title: '標籤操作節點', type: '標籤操作', position: { x: 700, y: 100 }, key: 'tagOperation', tags:'標籤1' },
  { id: '5', title: '加入好友', type: '入口', position: { x: 900, y: 100 }, key: 'firstStep', tags:'標籤2' },
  { id: '6', title: '隨機訊息節點', type: '隨機', position: { x: 100, y: 300 }, key: 'random', tags:'標籤2' },
  { id: '7', title: '標籤判定節點', type: '標籤判定', position: { x: 300, y: 300 }, key: 'tagDecision', tags:'標籤5' },
  { id: '8', title: '特殊關鍵字節點', type: '特殊關鍵字', position: { x: 500, y: 300 }, key: 'specialKeyword', tags:'標籤1, 標籤2' },
  { id: '9', title: '圖文選單節點', type: '圖文選單', position: { x: 700, y: 300 }, key: 'richMenu', tags:'標籤4' },
  { id: '10', title: '彈性模板節點', type: '彈性模板', position: { x: 900, y: 300 }, key: 'flexMessage', tags:'標籤3' },
];

const tagList = [
  {id: '1', tag: '標籤1'},
  {id: '2', tag: '標籤2'},
  {id: '3', tag: '標籤3'},
  {id: '4', tag: '標籤4'},
  {id: '5', tag: '標籤5'},
]

const getInitialViewport = () => {
  const stored = localStorage.getItem('viewport');
  return stored ? JSON.parse(stored) : { x: 0, y: 0, zoom: 1 };
};

const HomePage = () => {
  const { channel } = useParams(); 
  const [nodes, setNodes, onNodesChangeBase] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [barMenuOpen, setBarMenuOpen] = useState(false);
  const [viewport, setViewport] = useState(getInitialViewport());

  const onConnect = useCallback(createOnConnect(setEdges), [setEdges]);
  const onNodesChange = useCallback(createOnNodesChange(nodes, onNodesChangeBase, updateNodeLocation, channel), [nodes, onNodesChangeBase, channel]);

  useEffect(() => {
    fetchGraphData(channel, setNodes, setEdges);
  }, [channel]);
  
  useEffect(() => {
    localStorage.setItem('viewport', JSON.stringify(viewport));
  }, [viewport]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Navbar barMenuOpen={barMenuOpen} setBarMenuOpen={setBarMenuOpen} />
      <Panel
        nodes={nodes}
        setNodes={setNodes}
        onNodesChange={onNodesChange} 
        edges={edges}
        setEdges={setEdges}
        onConnect={onConnect}
        setBarMenuOpen={setBarMenuOpen}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        viewport={viewport}
        setViewport={setViewport}
        tagList={tagList}
      />
    </div>
  );
};

export default HomePage;
