import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  padding: 2% 3% 0 2%;
  background: transparent;
  justify-content: space-between;
  overflow: hidden;
  z-index: 1;
`;

export const IconWrapper = styled.div`
  background: white; 
  border: 1px solid #000000;
  padding: 8px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 35px;
`;

export const SearchWrapper = styled.div`
  background: white; 
  border: 1px solid #000000;
  padding: 8px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: width 0.3s ease;
  overflow: hidden;
  cursor: pointer;
  width: ${({ $expanded }) => ($expanded ? '200px' : '35px')}; 
`;

export const Search = styled.input`
  border: none;
  outline: none;
  width: 100%;
  margin-left: 8px;
  font-size: 14px;
  background: transparent;
  display: ${({ $expanded }) => ($expanded ? 'block' : 'none')}; 
`;

export const BarMenu = styled.div`
    position: fixed;
    top: 60px;
    left: 20px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    width: 150px;
    padding: 8px 0;
    z-index: 9999;
  
`;

export const BarMenuItem = styled.div`
    padding: 8px 16px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    white-space: nowrap;
    font-weight: bold;
    &:hover {
        background-color: #f0f0f0;
    }
`;


