import { Panel } from './nodeStyle';

function FirstStepNode({ messages }) {
  if (!messages || messages.length === 0) return null;

  return (
    <>
      {messages.map((msg, index) => (
        <Panel key={index}>
          <div className="type">{msg.type}</div>
        </Panel>
      ))}
    </>
  );
}

export default FirstStepNode;
