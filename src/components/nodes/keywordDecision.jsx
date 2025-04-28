import { Handle, Position } from 'reactflow';
import { Panel, Container } from './nodeStyle';

function KeywordDecisionNode({ messages }) {
  if (!messages || !messages.KeywordDesisions || messages.KeywordDesisions.length === 0) return null;

  return (
    <Container>
      {messages.KeywordDesisions.map((msg) => (
        <Panel key={msg.KeywordDecision.KWDecisionID}>
          <div className="text">{msg.KeywordDecision.Keyword}</div>
          <Handle
            type="source"
            id={`keyword-${msg.KeywordDecision.KWDecisionID}`}
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
       {messages.Else && messages.Else.NextNode !== 0 && (
        <Panel key="else-panel">
          <div className="text">其他條件</div>
          <Handle
            type="source"
            id={`else-${messages.Else.KWDecisionElseID}`}
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

export default KeywordDecisionNode;
