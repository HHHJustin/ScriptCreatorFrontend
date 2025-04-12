
import styled from 'styled-components';

/* Top */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 55%;
  height: 70%;
  max-width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

export const TopWrapper = styled.div`
  width: 100%;
  height : 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ;
  padding: 0 5%;
  border-bottom: 1px solid #eee;
  background-color: #f9f9f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`
export const GoPreviousNode = styled.button`
  width: 48px;
  height: 48px;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #ddd;
  }
`;

export const GoNextNode = styled(GoPreviousNode)``;

export const BranchGoNextNode = styled.button`
    width: 24px;
    height: 24px;
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 50%;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
    background: #ddd;
    }
`;

export const NodeTitle = styled.div`
  flex: 1;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  padding: 0 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

/* Content */
export const ContentWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  gap: 20px; /* 增加間距 */
  padding: 20px;
  box-sizing: border-box;
  background-color: #f5f7fa; /* 整個底色更柔和 */
`;

export const TagArea = styled.div`
    width: 35%;
    min-height: 100px;
    display: inline-box;
    flex-wrap: wrap; 
    align-items: flex-start;
    padding: 8px;
    background-color: #fafafa;
    border: 1px solid #eee;
    border-radius: 8px;
    box-sizing: border-box;
    overflow-y: auto;
`;

export const AddTagInput = styled.input`
    width: 90%;
    padding: 6px 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 5%;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    box-sizing: border-box;
    outline: none;

    &:focus {
        border-color: #4caf50; /* 綠色聚焦效果 */
    }
`;

export const Tag = styled.span`
    display: inline-block;
    padding: 6px 12px;
    background-color: ${(props) => (props.$active ? '#c8e6c9' : '#f0f0f0')};
    color: ${(props) => (props.$active ? '#2e7d32' : '#333')};
    font-size: 13px;
    border-radius: 16px;
    margin: 2px 6px;
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${(props) => (props.$active ? '#a5d6a7' : '#ddd')};
    }
`;

export const DataAreaWrapper = styled.div`
  flex: 1; /* 填滿剩下空間 */
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 12px;
  overflow: hidden;
`;

export const Table2 = styled.table`
  width: 90%;
  display: inline-box;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 12px;
  overflow: hidden;
`;

export const BranchNode = styled.table`
    width: 10%;
    display: inline-box;
`

export const Th = styled.th`
    background-color: #f0f2f5;
    color: #333;
    font-weight: 600;
    font-size: 14px;
    padding: 12px 16px;
    text-align: center; /* 改正：表頭置中 */
    border-bottom: 1px solid #ddd;
`;

export const Td = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: #333;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;

  &:first-child {
    border-left: 1px solid #f0f0f0;
  }

  &:last-child {
    border-right: 1px solid #f0f0f0;
  }
`;

export const Tr = styled.tr`
  &:hover {
    background-color: #f9fafb;
  }
`;