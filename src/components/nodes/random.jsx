import { Handle, Position } from 'reactflow';
import { Panel, Container } from './nodeStyle';

function RandomNode({ messages }) {
  if (!messages || messages.length === 0) return null;

  return (
    <Container>
      {messages.map((msg) => (
        <Panel key={msg.id}>
            <div className="title">{msg.condition}</div>
            <div className="text">{msg.weight}</div>
          <Handle
            type="source"
            id={msg.id}
            position={Position.Right}
            style={{
              position: 'absolute',
              top: '50%',
              right: -6,
              transform: 'translateY(-50%)',
              background: '#fbc02d',
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

export default RandomNode;
