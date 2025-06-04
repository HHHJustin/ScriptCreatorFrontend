import { Handle, Position } from 'reactflow';
import { Panel, Container } from './nodeStyle';

function RandomNode({ messages }) {
  if (!messages || messages.length === 0) return null;

  return (
    <Container>
      {messages.map((msg, index) => {
        const random = msg.Random;
        return (
          <Panel key={random.RandomID || index}>
            <div className="type">{random.Condition}</div>
            <div className="content">權重: {random.Weight}</div>
            <Handle
              type="source"
              id={`${random.RandomID}`}
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
        );
      })}
    </Container>
  );
}

export default RandomNode;
