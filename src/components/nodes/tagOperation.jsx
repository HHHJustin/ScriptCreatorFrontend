import { Panel } from "./nodeStyle";

function TagOperationNode({ messages }) {
  if (!messages || messages.length === 0) return null;
  return (
    <>
      {messages.map((msgWrapper, index) => {
        const msg = msgWrapper.TagOperation; 
        return (
          <Panel key={index}>
            <div className="type">{msg.TagName}</div>
            <div className="content">{msg.OperationType}</div>
          </Panel>
        )
      })}
    </>
  );
}

export default TagOperationNode;
