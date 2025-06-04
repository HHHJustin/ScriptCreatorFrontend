import { Panel } from "./nodeStyle";

function RichMenuNode({ messages, richMenus }) {
  if (!messages || messages.length === 0) return null;

  return (
    <>
      {messages.map((msgWrapper, index) => {
        const choice = msgWrapper.RichMenuChoice;
        const matchedMenu = richMenus.find(menu => menu.id === choice.RichMenuID);
        const menuName = matchedMenu ? matchedMenu.name : '未知選單';

        return (
          <Panel key={index}>
            <div className="text">{menuName}</div>
          </Panel>
        );
      })}
    </>
  );
}


export default RichMenuNode;
