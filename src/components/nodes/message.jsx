import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

const MessagePanel = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 16px 12px;
  font-size: 10px;
  &:not(:last-child) {
    border-bottom: 1px solid black;
  }

  .title {
    font-weight: bold;
    font-size: 12px;
    color: #1565c0;
    margin-bottom: 4px;
  }

  .content {
    font-size: 13px;
    color: #444;
    line-height: 1.5;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  }
`;


function MessageNode({ messages }) {
  if (!messages || messages.length === 0) return null;

  return (
    <>
      {messages.map((msg, index) => (
        <MessagePanel key={index}>
          <div className="title">{msg.title}</div>
          <div className="content">{msg.content}</div>
        </MessagePanel>
      ))}
    </>
  );
}

export default MessageNode;
