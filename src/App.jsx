import React, { useState } from 'react';
import ReactFlow, { Background } from 'reactflow';
import 'reactflow/dist/style.css';
import indexNode from './components/nodes';

const fakeMessage = [
  {
  id: '1',
  type: 'message',
  title: '文字',
  content: '你不是真正的快樂。'
  },
  {
    id: '2',
    type: 'message',
    title: '文字',
    content: '你的笑只是你穿的保護色'
  }
];

const initialNodes = [
  {
    id: '1',
    type: 'indexNode',
    data: { title: '訊息節點',
            type: '訊息',
            content: fakeMessage,
          },
    position: { x: 100, y: 100 }
  },
];

const initialEdges = [
  // { id: 'e1-2', source: '1', target: '2', animated: true },
  // { id: 'e2-3', source: '2', target: '3', animated: true }
];

const nodeTypes = {
    indexNode: indexNode,
}

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow 
        snapToGrid={true}
        snapGrid={[20, 20]}
        nodes={nodes} 
        edges={edges}
        nodeTypes={nodeTypes}
      > 
        <Background color="#ddd" gap={20} size={3} />
      </ReactFlow>
    </div>
  );
}

export default App;
