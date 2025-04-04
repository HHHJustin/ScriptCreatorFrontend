import { Handle, Position } from 'reactflow';
import ContentRenderer from './contentRenderer';
import styled from 'styled-components';
import { useState } from 'react';
import { useReactFlow } from 'reactflow';

// --- 顏色映射 ---
const typeColors = {
  '訊息':      { bg: '#f4faff', border: '#90caf9', title: '#1565c0', badge: '#e3f2fd', button: '#489af9' },
  '關鍵字判定': { bg: '#fff3e0', border: '#ffb74d', title: '#ef6c00', badge: '#ffe0b2', button: '#ffa726' },
  '快速回覆':   { bg: '#ffebee', border: '#ef5350', title: '#c62828', badge: '#ffcdd2', button: '#e53935' },
  '標籤操作':   { bg: '#f3e5f5', border: '#ab47bc', title: '#8e24aa', badge: '#e1bee7', button: '#ba68c8' },
  '入口':      { bg: '#e8f5e9', border: '#66bb6a', title: '#2e7d32', badge: '#c8e6c9', button: '#43a047' },
  '標籤判定':   { bg: '#e3f2fd', border: '#64b5f6', title: '#1565c0', badge: '#bbdefb', button: '#42a5f5' },
  '隨機':      { bg: '#fff8e1', border: '#fbc02d', title: '#f57f17', badge: '#ffecb3', button: '#f9a825' },
  '特殊關鍵字': { bg: '#ede7f6', border: '#7e57c2', title: '#5e35b1', badge: '#d1c4e9', button: '#7e57c2' },
  '圖文選單':   { bg: '#efebe9', border: '#8d6e63', title: '#5d4037', badge: '#d7ccc8', button: '#6d4c41'},
  '彈性模板':   { bg: '#fce4ec', border: '#f06292', title: '#c2185b', badge: '#f8bbd0', button: '#ec407a'}, 
};

const Wrapper = styled.div`
  width: 120px;
  box-sizing: border-box;
  padding: 0;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const NodeWrapper = styled.div`
  background: ${({ type }) => typeColors[type]?.bg || 'white'};
  border: 2px solid ${({ type }) => typeColors[type]?.border || '#ccc'};
  border-radius: ${({ type }) => (type === '入口' ? '5px' : '5px 5px 0 0')};
  padding: 12px 16px;
  width: 100%;
  height: 80px;
  font-family: sans-serif;
`;

const ContentWrapper = styled.div`
  z-index: 10;
`;

const Title = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  color: ${({ type }) => typeColors[type]?.title || '#000'};
  margin-bottom: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TypeBadge = styled.div`
  font-size: 12px;
  color: #555;
  background-color: ${({ type }) => typeColors[type]?.badge || '#eee'};
  border-radius: 6px;
  padding: 4px 8px;
  display: inline-block;
`;

const TriangleButton = styled.button`
  width: 100%;
  height: 20px;
  border: 2px solid ${({ type }) => typeColors[type]?.button || '#ccc'};
  background: white;
  font-size: 12px;
  color: #777;
  cursor: pointer;
  border-radius: 0 0 6px 6px;
`;


function IndexNode({ data, id }) {
    const { setNodes } = useReactFlow();
    const [messages, setMessage] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const handleTriangleClick = () => {
        setIsOpen((prev) => {
          if (!prev) {
            setMessage(data.content);
            setNodes((nodes) =>
              nodes.map((node) =>
                node.id === id
                  ? { ...node, style: { ...node.style, zIndex: 1000 } }
                  : node  // ✅ 不要動其他人的 style！
              )
            );
          } else {
            setMessage(null);
            setNodes((nodes) =>
              nodes.map((node) =>
                node.id === id
                  ? { ...node, style: { ...node.style, zIndex: undefined } }
                  : node
              )
            );
          }
          return !prev;
        });
      };
      
    const hiddenTypes = ['關鍵字判定', '標籤判定', '隨機']
  
    return (
    <Wrapper>
        <NodeWrapper type={data.type}>
            {/* 左側進線點 */}
            <Handle
            type="target"
            position={Position.Left}
            style={{
                background: '#777777',
                width: 8,
                height: 8,
                borderRadius: '50%',
                left: -6,
            }}
            />

            <Title type={data.type}>
                {data.title || '未命名節點'}
            </Title>

            <TypeBadge type={data.type}>
                {data.type || '未知類型'}
            </TypeBadge>
            
            {/* 右側出線點 */}
            <Handle
                type="source"
                position={Position.Right}
                style={{
                background: '#777777',
                width: 8,
                height: 8,
                borderRadius: '50%',
                right: -6,
                visibility: hiddenTypes.includes(data.type) ? 'hidden' : 'visible', 
                }}
            />
        </NodeWrapper>
        <ContentWrapper>
            {messages && (
            <ContentRenderer type={data.type} messages={messages} />
            )}
        </ContentWrapper>
        {data.type !== '入口' && (
                <TriangleButton onClick={handleTriangleClick} type={data.type}>
                    {isOpen ? '▲' : '▼'}
                </TriangleButton>
            )}
    </Wrapper>
  );
}

export default IndexNode;
