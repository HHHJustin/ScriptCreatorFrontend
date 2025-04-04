import styled from 'styled-components';

const Panel = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 16px 12px;
  font-size: 10px;
  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }

  .message {
    font-weight: bold;
    font-size: 12px;
    color: #444444;
    margin-bottom: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }
`;


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
