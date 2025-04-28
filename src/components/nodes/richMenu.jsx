import { Panel } from "./nodeStyle";


function RichMenuNode({ messages }) {
  if (!messages || messages.length === 0) return null;

  return (
    <>
    {messages.map((msgWrapper, index) => {
      const msg = msgWrapper.RichMenu;  
      return (
        <Panel key={index}>
          <div className="menu">{msg.RichMenuName}</div>
        </Panel>
      );
    })}
  </>
  );
}

export default RichMenuNode;
