import { Panel } from './nodeStyle';

function FlexMessageNode({ messages }) {
  if (!messages || messages.length === 0) return null;

  return (
    <>
      {messages.map((msg, index) => (
        <Panel key={index}>
          <div className="message">{msg.message}</div>
        </Panel>
      ))}
    </>
  );
}

export default FlexMessageNode;
