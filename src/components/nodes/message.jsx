import { Panel } from './nodeStyle';

function MessageNode({ messages }) {
  if (!Array.isArray(messages) || messages.length === 0) return null;

  return (
    <>
      {messages.map((msg, index) => (
        <Panel key={index}>
          <div className="type">{msg.type}</div>
          <div className="content">
            {msg.type === 'text' && msg.text}
            {(msg.type === 'image' || msg.type === 'video') && msg.fileName}
          </div>
        </Panel>
      ))}
    </>
  );
}

export default MessageNode;
