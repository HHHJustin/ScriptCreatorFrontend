import styled from 'styled-components';
import { Handle, Position } from 'reactflow';

const Container = styled.div`
  width: 100%;
`;

const Panel = styled.div`
  padding: 16px 12px;
  border-bottom: 1px solid #ddd;

  .text {
    font-weight: bold;
    font-size: 12px;
    color: #444444;;
    margin-bottom: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }
`;

function KeywordDecisionNode({ messages }) {
  if (!messages || messages.length === 0) return null;

  return (
    <Container>
      {messages.map((msg) => (
        <Panel key={msg.id}>
            <div className="text">{msg.keyword}</div>
          <Handle
            type="source"
            id={`keyword-${msg.id}`}
            position={Position.Right}
            style={{
              position: 'absolute',
              top: '50%',
              right: -6,
              transform: 'translateY(-50%)',
              background: '#ef6c00',
              width: 8,
              height: 8,
              borderRadius: '50%',
            }}
          />
        </Panel>
      ))}
    </Container>
  );
}

export default KeywordDecisionNode;
