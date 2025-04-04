import styled from 'styled-components';
import { useState } from 'react';

const Menu = styled.div`
  background: white;
  border: 1px solid #ccc;
  padding: 4px;
  width: 150px;
  position: fixed;
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 8px;
  cursor: pointer;
  position: relative;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Submenu = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  background: white;
  border: 1px solid #ccc;
  min-width: 120px;
  z-index: 1001;
`;

function ContextMenu({ position, onClose }) {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleClick = (action) => {
    console.log(`你點了：${action}`);
    onClose();
  };

  return (
    <Menu style={{ top: position.y, left: position.x }}>
      <MenuItem onClick={() => handleClick('編輯')}>編輯</MenuItem>
      <MenuItem onClick={() => handleClick('刪除')}>刪除</MenuItem>

      <MenuItem
        onMouseEnter={() => setShowSubmenu(true)}
        onMouseLeave={() => setShowSubmenu(false)}
      >
        其他 ➔
        {showSubmenu && (
          <Submenu>
            <MenuItem onClick={() => handleClick('子選單1')}>子選單1</MenuItem>
            <MenuItem onClick={() => handleClick('子選單2')}>子選單2</MenuItem>
            <MenuItem onClick={() => handleClick('子選單3')}>子選單3</MenuItem>
          </Submenu>
        )}
      </MenuItem>
    </Menu>
  );
}

export default ContextMenu;
