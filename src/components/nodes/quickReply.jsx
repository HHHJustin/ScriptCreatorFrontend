import { Panel } from "./nodeStyle";


function QuickReplyNode({ messages }) {
  if (!messages || messages.length === 0) return null;
  return (
    <>
      {messages.map((msgWrapper, index) => {
        const msg = msgWrapper.QuickReply;  
        return (
          <Panel key={index}>
            <div className="type">{msg.ButtonName}</div>
            <div className="content">{msg.Reply}</div>
          </Panel>
        );
      })}
    </>
  );
}

export default QuickReplyNode;
