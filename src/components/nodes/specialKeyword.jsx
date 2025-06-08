import { Handle, Position } from 'reactflow';
import { Panel, Container } from './nodeStyle';

function SpecialKeywordDecisionNode({ messages }) {
  if (!messages || messages.length === 0) return null;

  return (
    <Container>
      {messages.map((msg, index) => {
        const keywordObj = msg.SpecialKeyword;
        return (
          <Panel key={keywordObj.SpecialKeywordID}>
            <div className="text">{keywordObj.Keyword}</div>
          </Panel>
        );
      })}
    </Container>
  );
}


export default SpecialKeywordDecisionNode;
