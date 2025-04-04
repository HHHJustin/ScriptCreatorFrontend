import { Handle, Position } from 'reactflow';
import ContentRenderer from './contentRenderer';
import { Wrapper, NodeWrapper, Title, TypeBadge, TriangleButton, ContentWrapper, ContextMenu, MenuItem, SubMenu, SubMenuItem } from './indexNodeStyle';
import { useNodeActions } from './hooks/index';
import { useState } from 'react';
import { createPortal } from 'react-dom';

const options = {
  "訊息": "Message",
  "快速回覆": "QuickReply",
  "關鍵字判別": "KeywordDecision",
  "標籤判別": "TagDecision",
  "標籤操作": "TagOperation",
  "隨機": "Random",
  "離開群組": "LeaveGroup",
  "彈性模板訊息": "FlexMessage",
  "開啟圖文選單": "RichMenuON",
  "關閉圖文選單": "RichMenuOFF",
};

function IndexNode({ data, id }) {
  const { messages, isOpen, handleTriangleClick } = useNodeActions(data, id);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const hiddenTypes = ['關鍵字判定', '標籤判定', '隨機'];

  const handleContextMenu = (e) => {
    e.preventDefault();
    const offsetX = 0;
    const offsetY = 0;
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 150;

    let x = e.clientX + offsetX;
    let y = e.clientY + offsetY;

    if (x > maxX) x = maxX;
    if (y > maxY) y = maxY;

    setMenuVisible(true);
    setMenuPosition({ x, y });
  };

  const handleMenuClick = (action) => {
    console.log(`你點了：${action}`);
    setMenuVisible(false);
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

  return (
    <>
      <Wrapper>
        <NodeWrapper type={data.type} onContextMenu={handleContextMenu}>
          <Handle
            type="target"
            position={Position.Left}
            style={{ background: '#777', width: 8, height: 8, borderRadius: '50%', left: -6 }}
          />
          <Title type={data.type}>{data.title || '未命名節點'}</Title>
          <TypeBadge type={data.type}>{data.type || '未知類型'}</TypeBadge>
          <Handle
            type="source"
            position={Position.Right}
            style={{
              background: '#777',
              width: 8,
              height: 8,
              borderRadius: '50%',
              right: -6,
              visibility: hiddenTypes.includes(data.type) ? 'hidden' : 'visible',
            }}
          />
        </NodeWrapper>
        <ContentWrapper>
          {messages && <ContentRenderer type={data.type} messages={messages} />}
        </ContentWrapper>
        {data.type !== '入口' && (
          <TriangleButton onClick={handleTriangleClick} type={data.type}>
            {isOpen ? '▲' : '▼'}
          </TriangleButton>
        )}
      </Wrapper>

      {menuVisible &&
        createPortal(
          <ContextMenu $x={menuPosition.x} $y={menuPosition.y} onMouseLeave={handleCloseMenu}>
            <MenuItem>
            <span>新增下一個點</span>    
            <span>▶︎</span>      
            <SubMenu>
              {Object.entries(options).map(([label, value]) => (
                <SubMenuItem key={value} onClick={() => handleMenuClick(value)}>
                  {label}
                </SubMenuItem>
              ))}
            </SubMenu>
            </MenuItem>
            <MenuItem onClick={() => handleMenuClick('刪除此點')}>刪除此點</MenuItem>
            <MenuItem onClick={() => handleMenuClick('建立連結')}>建立連結</MenuItem>
            <MenuItem onClick={() => handleMenuClick('編輯')}>編輯</MenuItem>
          </ContextMenu>,
          document.body  
        )
      }
    </>
  )
};

export default IndexNode;
