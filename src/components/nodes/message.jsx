import styled from 'styled-components';
import { Panel } from './nodeStyle';

function MessageNode({ messages }) {
  if (!messages || messages.length === 0) return null;

  return (
    <>
      {messages.map((msg, index) => (
        <Panel key={index}>
          <div className="type">{msg.type}</div>
          <div className="content">{msg.content}</div>
        </Panel>
      ))}
    </>
  );
}

export default MessageNode;
