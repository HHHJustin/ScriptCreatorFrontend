
import React, { useState, useCallback, useEffect } from 'react';
import { useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import Navbar from '../../components/header/navbar';
import Panel from '../../components/Panel/Panel';
import IndexNode from '../../components/nodes/indexNode';
import CustomEdge from '../../components/edge/edge';
import { useParams } from 'react-router-dom';


const nodeTypes = {
  indexNode: IndexNode,
};
  
const edgeTypes = {
  customEdge: CustomEdge,
};
  
const fetchGraphData = async (channel, setNodes, setEdges) => {
  try {
    const res = await fetch(`/api/${channel}/home`);
    const data = await res.json();

    const newNodes = data.nodes.map(node => ({
      id: String(node.id),
      type: 'indexNode',
      position: { x: Number(node.x), y: Number(node.y) },
      data: {
        title: node.title,
        type: node.type,
      },
      style: { zIndex: 1 },
    }));

    const newEdges = data.links.map(link => ({
      id: `e${link.from}-${link.to}`,
      source: String(link.from),
      target: String(link.to),
      sourceHandle: link.sourceFrom ? `keyword-${link.sourceFrom}` : undefined,
      type: 'customEdge',
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  } catch (err) {
    console.error('Failed to fetch graph data:', err);
  }
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

  const updateNodeLocation = async (node) => {
    try {
      await fetch('/api/updatelocation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentNodeId: Number(node.id),
          channelId: Number(channel),
          locX: node.position.x,
          locY: node.position.y,
        }),
      });
    } catch (err) {
      console.error('Failed to update node location:', err);
    }
  };

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge({ ...params, type: 'customEdge' }, eds));
  }, []);

  const onNodesChange = useCallback((changes) => {
    changes.forEach((change) => {
      if (change.type === 'position' && change.position) {
        const movedNode = nodes.find((n) => n.id === change.id);
        if (movedNode) {
          const updatedNode = {
            ...movedNode,
            position: {
              ...movedNode.position,
              ...change.position,
            },
          };
          updateNodeLocation(updatedNode);
        }
      }
    });

    // 最後記得套用原本的變化
    onNodesChangeBase(changes);
  }, [nodes, onNodesChangeBase]);

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
