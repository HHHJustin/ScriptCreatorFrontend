import React, { useState } from 'react';
import { useNodesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import IndexNode from './components/nodes/indexNode';
import { useCallback } from 'react';
import Navbar from './components/header/navbar';
import Panel from './components/Panel/Panel';
import CustomEdge from './components/edge/edge';

const nodeTypes = {
  indexNode: IndexNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const initialData = {
  message: [
    { id: '1', title: '文字', content: '你不是真正的快樂。' },
    { id: '2', title: '文字', content: '你的笑只是你穿的保護色。' },
  ],
  keyword: [
    { id: '1', keyword: '大家好' },
    { id: '2', keyword: '你好' },
    { id: '3', keyword: '你好棒' },
    { id: '4', keyword: '你好強' },
  ],
  quickReply: [
    { id: '1', button: '這是按鈕A', reply: '這是回覆A' },
    { id: '2', button: '這是按鈕B', reply: '這是回覆B' },
    { id: '3', button: '這是按鈕C', reply: '這是回覆C' },
  ],
  tagOperation: [
    { id: '1', tag: '標籤A', operation: '新增' },
    { id: '2', tag: '標籤B', operation: '移除' },
    { id: '3', tag: '標籤C', operation: '新增' },
  ],
  tagDecision: [
    { id: '1', title: '選項A', tags: '1, 2, 3' },
    { id: '2', title: '選項B', tags: '1, 2' },
    { id: '3', title: '選項C', tags: '1' },
  ],
  firstStep: [
    { id: '1', type: '加入好友' },
  ],
  random: [
    { id: '1', condition: '狀況1', weight: '5' },
    { id: '2', condition: '狀況2', weight: '2' },
    { id: '3', condition: '狀況3', weight: '3' },
  ],
  specialKeyword: [
    { id: '1', keyword: '特殊1' },
    { id: '2', keyword: '特殊2' },
    { id: '3', keyword: '特殊3' },
  ],
  richMenu: [
    { id: '1', menu: '圖文選單1'},
  ],
  flexMessage: [
    { id: '1', message: '彈性模板訊息1' },
  ],
};

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'customEdge' },
  { id: 'e-keyword3-to-node3', source: '2', target: '3', sourceHandle: 'keyword-3',  type: 'customEdge' },
  { id: 'e-keyword2-to-node4', source: '2', target: '4', sourceHandle: 'keyword-4',  type: 'customEdge' },
];


const nodeConfig = [
  { id: '1', title: '訊息節點', type: '訊息', position: { x: 100, y: 100 }, key: 'message' },
  { id: '2', title: '關鍵字節點', type: '關鍵字判定', position: { x: 300, y: 100 }, key: 'keyword' },
  { id: '3', title: '快速回覆節點', type: '快速回覆', position: { x: 500, y: 100 }, key: 'quickReply' },
  { id: '4', title: '標籤操作節點', type: '標籤操作', position: { x: 700, y: 100 }, key: 'tagOperation' },
  { id: '5', title: '加入好友', type: '入口', position: { x: 900, y: 100 }, key: 'firstStep' },
  { id: '6', title: '隨機訊息節點', type: '隨機', position: { x: 100, y: 300 }, key: 'random' },
  { id: '7', title: '標籤判定節點', type: '標籤判定', position: { x: 300, y: 300 }, key: 'tagDecision' },
  { id: '8', title: '特殊關鍵字節點', type: '特殊關鍵字', position: { x: 500, y: 300 }, key: 'specialKeyword' },
  { id: '9', title: '圖文選單節點', type: '圖文選單', position: { x: 700, y: 300 }, key: 'richMenu' },
  { id: '10', title: '彈性模板節點', type: '彈性模板', position: { x: 900, y: 300 }, key: 'flexMessage' },
];

const createNodes = (data) => {
  return nodeConfig.map((item) => ({
    id: item.id,
    type: 'indexNode',
    position: item.position,
    data: {
      title: item.title,
      type: item.type,
      content: data[item.key],
    },
    style: { zIndex: 1 },
  }));
};

const App = () => {
  const [data] = useState(initialData);
  const [nodes, setNodes, onNodesChange] = useNodesState(createNodes(data));
  const [edges, setEdges] = useState(initialEdges);
  const [barMenuOpen, setBarMenuOpen] = useState(false);
  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge({ ...params, type: 'initialEdge' }, eds));
  }, []);
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
      />
    </div>
  );
};

export default App;