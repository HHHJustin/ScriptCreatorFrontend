import styled from 'styled-components';
import { typeColors } from './indexTypeColor';

export const Wrapper = styled.div`
  width: 120px;
  box-sizing: border-box;
  padding: 0;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const NodeWrapper = styled.div`
  background: ${({ type }) => typeColors[type]?.bg || 'white'};
  border: 2px solid ${({ type }) => typeColors[type]?.border || '#ccc'};
  border-radius: ${({ type }) => (type === '入口' ? '5px' : '5px 5px 0 0')};
  padding: 12px 16px;
  width: 100%;
  height: 80px;
  font-family: sans-serif;
`;

export const Title = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  color: ${({ type }) => typeColors[type]?.title || '#000'};
  margin-bottom: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const TypeBadge = styled.div`
  font-size: 12px;
  color: #555;
  background-color: ${({ type }) => typeColors[type]?.badge || '#eee'};
  border-radius: 6px;
  padding: 4px 8px;
  display: inline-block;
`;

export const TriangleButton = styled.button`
  width: 100%;
  height: 20px;
  border: 2px solid ${({ type }) => typeColors[type]?.button || '#ccc'};
  background: white;
  font-size: 12px;
  color: #777;
  cursor: pointer;
  border-radius: 0 0 6px 6px;
`;

export const ContentWrapper = styled.div`
  z-index: 10;
`;

export const ContextMenu = styled.div`
  position: fixed;
  top: ${({ $y }) => $y}px;
  left: ${({ $x }) => $x}px;
  width: 140px;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  border-radius: 6px;
  padding: 8px 0;
  z-index: 2000;
`;

// 單一選單項目
export const MenuItem = styled.div`
  position: relative;  /* 為了讓子選單以自己為基準定位 */
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  white-space: nowrap;
  display: flex;         /* 🔥 用 flex 排版 */
  justify-content: space-between; /* 🔥 左右兩邊 */

  &:hover {
    background-color: #f0f0f0;
  }

  &:hover > div {
    display: block; /* 滑到的時候子選單打開 */
  }
`;

// 子選單外層
export const SubMenu = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 100%; /* 子選單往右邊出現 */
  margin-left: 2px;
  width: 140px;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  border-radius: 6px;
  padding: 8px 0;
  z-index: 2000;
`;

// 子選單內的選項
export const SubMenuItem = styled.div`
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #f0f0f0;
  }
`;