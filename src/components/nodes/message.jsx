import { Panel } from './nodeStyle';

function MessageNode({ messages }) {
  if (!messages || messages.length === 0) return null;
  
  return (
    <>
      {messages.map((msgWrapper, index) => {
        const msg = msgWrapper.Message;  
        return (
          <Panel key={index}>
            <div className="type">{msg.Type}</div>
            <div className="content">{msg.Content}</div>
          </Panel>
        );
      })}
    </>
  );
}

export default MessageNode;
