import React, { useEffect, useMemo, useState } from 'react';
import ReactFlow, { Background } from 'reactflow';
import 'reactflow/dist/style.css';
import indexNode from './components/nodes';

const nodeTypes = {
  indexNode: indexNode,
};

const App = () => {
  const [data, setData] = useState({
    message: [
      { id: '1', title: '文字', content: '你不是真正的快樂。' },
      { id: '2', title: '文字', content: '你的笑只是你穿的保護色。' },
    ],
    keyword: [
      { id: '1', title: '第一', keyword: '大家好' },
      { id: '2', title: '第二', keyword: '你好' },
      { id: '3', title: '第三', keyword: '你好棒' },
      { id: '4', title: '第四', keyword: '你好強' },
    ],
    quickReply: [
      { id: '1', button: '這是按鈕A', reply: '這是回覆A' },
      { id: '2', button: '這是按鈕B', reply: '這是回覆B' },
      { id: '3', button: '這是按鈕C', reply: '這是回覆C' },
    ],
  });

  const nodes = useMemo(
    () => [
      {
        id: '1',
        type: 'indexNode',
        data: { title: '訊息節點', type: '訊息', content: data.message },
        position: { x: 100, y: 100 },
      },
      {
        id: '2',
        type: 'indexNode',
        data: { title: '關鍵字節點', type: '關鍵字判定', content: data.keyword },
        position: { x: 300, y: 100 },
      },
      {
        id: '3',
        type: 'indexNode',
        data: { title: '快速回覆節點', type: '快速回覆', content: data.quickReply },
        position: { x: 500, y: 100 },
      },
    ],
    [data]
  );

  const [edges, setEdges] = useState([]);

  return (
    <ReactFlow
      snapToGrid={true}
      snapGrid={[20, 20]}
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
    >
      <Background color="#ddd" gap={20} size={3} />
    </ReactFlow>
  );
};

export default App;