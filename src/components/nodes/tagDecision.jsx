import { Handle, Position } from 'reactflow';
import { Panel, Container } from './nodeStyle';

function TagDecisionNode({ messages }) {
  if (!messages || messages.length === 0) return null;

  return (
    <Container>
      {messages.map((msg) => (
        <Panel key={msg.id}>
            <div className="title">{msg.title}</div>
            <div className="text">{msg.tags}</div>
          <Handle
            type="source"
            id={msg.id}
            position={Position.Right}
            style={{
              position: 'absolute',
              top: '50%',
              right: -6,
              transform: 'translateY(-50%)',
              background: '#64b5f6',
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

export default TagDecisionNode;
