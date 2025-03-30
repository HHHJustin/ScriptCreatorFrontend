import { Handle, Position } from 'reactflow';
import ContentRenderer from './contentRenderer';
import styled from 'styled-components';
import { useState } from 'react';


const Wrapper = styled.div`
  width: 120px;
  box-sizing: border-box;
  padding: 0;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const NodeWrapper = styled.div`
    background: ${(props) => {
        switch(props.type) {
            case '訊息':
                return '#f4faff';
            case '關鍵字判定':
                return '#fff3e0';
            case '快速回覆':
                return '#ffebee'
        }
    }};
    border: 2px solid ${(props) => {
            switch(props.type){
                case '訊息':
                    return '#90caf9';
                case '關鍵字判定':
                    return '#ffb74d';
                case '快速回覆':
                    return '#ef5350'
        }
    }};
    border-radius: 5px 5px 0 0;
    padding: 12px 16px;
    width: 100%;
    height: 80px;
    font-family: sans-serif;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    position: relative;
`;

// 標題樣式
const Title = styled.div`
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    color: ${(props) => {
        switch(props.type) {
            case '訊息':
                return '#1565c0;';
            case '關鍵字判定':
                return '#ef6c00';
            case '快速回覆':
                return '#c62828';
            default:
                return '#000000';
        }
    }};
    margin-bottom: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

// 類型標籤樣式
const TypeBadge = styled.div`
    font-size: 12px;
    color: #555555;
    background-color: ${(props) => {
        switch(props.type) {
            case '訊息':
                return '#e3f2fd';
            case '關鍵字判定':
                return '#ffe0b2';
            case '快速回覆':
                return '#ffcdd2'
            default:
                return '#eeeeee';
        }
    }};
    border-radius: 6px;
    padding: 4px 8px;
    display: inline-block;
`;

const TriangleButton = styled.button`
    width: 100%;
    height: 20px;
    border: 2px solid ${(props) => {
    switch(props.type){
        case '訊息': 
            return '#489af9';
        case '關鍵字判定':
            return '#ffa726';
        case '快速回覆':
            return '#e53935'
        default: 
            return '#ccc';
    }
    }};
    background: white;
    font-size: 12px;
    color: #777777;
    cursor: pointer;
    border-radius: 0 0 6px 6px;
`;

function IndexNode({ data, id }) {
    const [messages, setMessage] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const handleTriangleClick = () => {
        if (!isOpen) {
            setMessage(data.content);
        } else {
            setMessage(null);
        }
        setIsOpen(!isOpen);
    };
    const hiddenTypes = ['關鍵字判定']
  
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
        {messages && (
            <ContentRenderer type={data.type} messages={messages} />
)}

        <TriangleButton onClick={handleTriangleClick} type={data.type}>
            {isOpen ? '▲' : '▼'}
        </TriangleButton>
    </Wrapper>
  );
}

export default IndexNode;
