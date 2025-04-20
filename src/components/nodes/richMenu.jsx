import { Panel } from "./nodeStyle";


function RichMenuNode({ messages }) {
  if (!messages || messages.length === 0) return null;

  return (
    <>
      {messages.map((msg, index) => (
        <Panel key={index}>
          <div className="menu">{msg.menu}</div>
        </Panel>
      ))}
    </>
  );
}

export default RichMenuNode;
