import { Panel } from './nodeStyle';

function FlexMessageNode({ messages, flexMessages }) {
  if (!messages || messages.length === 0) return null;

  return (
    <>
      {messages.map((msgWrapper, index) => {
        const choice = msgWrapper.FlexMessageChoice;
        const matchedMessage = flexMessages.find(fm => fm.id === choice.FlexMessageID);
        const messageName = matchedMessage ? matchedMessage.name : '未知訊息';

        return (
          <Panel key={index}>
            <div className="message">{messageName}</div>
          </Panel>
        );
      })}
    </>
  );
}

export default FlexMessageNode;

