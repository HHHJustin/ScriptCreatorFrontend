import { Handle, Position } from 'reactflow';
import { Panel, Container } from './nodeStyle';

function SpecialKeywordDecisionNode({ messages }) {
  if (!messages || messages.length === 0) return null;

  return (
    <Container>
      {messages.map((msg) => (
        <Panel key={msg.id}>
            <div className="text">{msg.keyword}</div>
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
        </Panel>
      ))}
    </Container>
  );
}

export default SpecialKeywordDecisionNode;
