import styled from 'styled-components';
import { Handle, Position } from 'reactflow';

const KeywordContainer = styled.div`
  width: 100%;
`;

const KeywordItem = styled.div`
  padding: 16px 12px;
  border-bottom: 1px solid #ddd;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 12px;
  color: #ef6c00;
  margin-bottom: 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const KeywordText = styled.div`
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

function KeywordDecisionNode({ messages }) {
  if (!messages || messages.length === 0) return null;

  return (
    <KeywordContainer>
      {messages.map((msg) => (
        <KeywordItem key={msg.id}>
          <Title>{msg.title}</Title>
          <KeywordText>{msg.keyword}</KeywordText>

          <Handle
            type="source"
            id={msg.id}
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
        </KeywordItem>
      ))}
    </KeywordContainer>
  );
}

export default KeywordDecisionNode;
