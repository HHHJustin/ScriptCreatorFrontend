import styled from 'styled-components';

export const SelectBoxMenuWrapper = styled.div`
  position: fixed;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  z-index: 1000;
`;

export const SelectBoxMenuItem = styled.div`
  position: relative;  /* 為了讓子選單以自己為基準定位 */
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  white-space: nowrap;
  display: flex;        
  justify-content: space-between; 
  font-weight: bold;

  &:hover {
    background-color: #f0f0f0;
  }

  &:hover > div {
    display: block; /* 滑到的時候子選單打開 */
  }
`;

