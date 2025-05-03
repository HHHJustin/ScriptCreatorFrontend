import { Handle, Position } from 'reactflow';
import { Panel, Container } from './nodeStyle';

function TagDecisionNode({ messages }) {
  const tagDecisions = messages?.TagDecisions ?? [];

  return (
    <Container>
      {tagDecisions.map((msg) => (
        <Panel key={msg.TagDecision.TagDecisionID}>
          <div className="title">{msg.TagDecision.Name}</div>
          <div className="text">{msg.TagDecision.Tags}</div>
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
       {messages.Else && (
        <Panel key="else-panel">
          <div className="text">其他情況</div>
          <Handle
            type="source"
            id={`else-${messages.Else.TagDecisionElseID}`}
            position={Position.Right}
            style={{
              position: 'absolute',
              top: '50%',
              right: -6,
              transform: 'translateY(-50%)',
              background: '#999',
              width: 8,
              height: 8,
              borderRadius: '50%',
            }}
          />
        </Panel>
      )}
    </Container>
  );
}


export default TagDecisionNode;
