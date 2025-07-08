import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Wrapper, IconWrapper, SearchWrapper, Search, BarMenu, BarMenuItem } from './narbarStyle';


function Navbar({ barMenuOpen, setBarMenuOpen, onSearch }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const menuRef = useRef(null);
  const navigate = useNavigate(); 
  const { channel } = useParams(); 

  const toggleBarMenu = () => {
    setBarMenuOpen(prev => !prev);
  };

  const handleMenuClick = (action) => {
    setBarMenuOpen(false); 
    switch (action) {
      case '編輯':
        navigate(`/${channel}/setting`);
        break;
      case '返回':
        navigate('/channel');
        break;
      default:
        console.warn('未知的選單項目:', action);
    }
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
  
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      const tags = searchText.split(',').map(tag => tag.trim()).filter(Boolean);
      onSearch(tags); // 呼叫傳進來的函式
    }
  };
  
  return (
    <>
    <Wrapper>
      <IconWrapper onClick={toggleBarMenu}>
        <FontAwesomeIcon icon={faBars} />
      </IconWrapper>
      <SearchWrapper $expanded={searchOpen}>
          <FontAwesomeIcon icon={faMagnifyingGlass} onClick={() => setSearchOpen(prev => !prev)} />
          <Search
            placeholder="搜尋..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            $expanded={searchOpen}
          />
        </SearchWrapper>
    </Wrapper>
    {barMenuOpen && (
        <BarMenu ref={menuRef}>
          <BarMenuItem onClick={() => handleMenuClick('編輯')}>編輯</BarMenuItem>
          <BarMenuItem onClick={() => handleMenuClick('返回')}>返回</BarMenuItem>
        </BarMenu>
      )}
    </>
  );
}

export default Navbar;
