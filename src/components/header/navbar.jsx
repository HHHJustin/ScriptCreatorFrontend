import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import { Wrapper, IconWrapper, SearchWrapper, Search, BarMenu, BarMenuItem } from './narbarStyle';


function Navbar({ barMenuOpen, setBarMenuOpen }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleSearch = () => {
    setSearchOpen(prev => !prev);
  };

  const toggleBarMenu = () => {
    setBarMenuOpen(prev => !prev);
  };

  const handleMenuClick = (action) => {
    console.log(`你點了：${action}`);
    setBarMenuOpen(false); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest('.react-flow')
      ) {
        setBarMenuOpen(false);
      }
    };
  
    if (barMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [barMenuOpen]);
  
  
  return (
    <>
    <Wrapper>
      <IconWrapper onClick={toggleBarMenu}>
        <FontAwesomeIcon icon={faBars} />
      </IconWrapper>
      <SearchWrapper $expanded={searchOpen}>
        <FontAwesomeIcon icon={faMagnifyingGlass}  onClick={toggleSearch}/>
        <Search placeholder="搜尋..." $expanded={searchOpen} />
      </SearchWrapper>
    </Wrapper>
    {barMenuOpen && (
    <BarMenu ref={menuRef}>
        <BarMenuItem onClick={() => handleMenuClick('編輯標籤')}>編輯標籤</BarMenuItem>
        <BarMenuItem onClick={() => handleMenuClick('編輯入口')}>編輯入口</BarMenuItem>
        <BarMenuItem onClick={() => handleMenuClick('編輯圖文選單')}>編輯圖文選單</BarMenuItem>
        <BarMenuItem onClick={() => handleMenuClick('編輯彈性樣板訊息')}>編輯彈性樣板</BarMenuItem>
        <BarMenuItem onClick={() => handleMenuClick('LineBot設定')}>LineBot設定編輯</BarMenuItem>
        <BarMenuItem onClick={() => handleMenuClick('新增特殊關鍵字')}>新增特殊關鍵字</BarMenuItem>
    </BarMenu>
    )}
    </>
  );
}

export default Navbar;
