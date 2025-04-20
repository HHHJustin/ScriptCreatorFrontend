import { Panel } from "./nodeStyle";

function TagOperationNode({ messages }) {
  if (!messages || messages.length === 0) return null;

  return (
    <>
      {messages.map((msg, index) => (
        <Panel key={index}>
          <div className="title">{msg.tag}</div>
          <div className="content">{msg.operation}</div>
        </Panel>
      ))}
    </>
  );
}

export default TagOperationNode;
