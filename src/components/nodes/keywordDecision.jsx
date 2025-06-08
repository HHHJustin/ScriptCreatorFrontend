import { Handle, Position } from 'reactflow';
import { Panel, Container } from './nodeStyle';

function KeywordDecisionNode({ messages }) {
  const keywordDecisions = messages?.KeywordDecisions ?? [];

  return (
    <Container>
      {keywordDecisions.map((msg) => (
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
       {messages.Else && (
        <Panel key="else-panel">
          <div className="text">其他情況</div>
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
