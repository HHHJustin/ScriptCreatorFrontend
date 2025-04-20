import { Panel } from "./nodeStyle";


function QuickReplyNode({ messages }) {
  if (!messages || messages.length === 0) return null;

  return (
    <>
      {messages.map((msg, index) => (
        <Panel key={index}>
          <div className="title">{msg.button}</div>
          <div className="content">{msg.reply}</div>
        </Panel>
      ))}
    </>
  );
}

export default QuickReplyNode;
