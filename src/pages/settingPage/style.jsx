import styled from 'styled-components';

export const SettingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);  /* 黑色半透明 */
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SettingWrapper = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  width: 60%;
  height: 80%;
  max-width: 90%;
  overflow-y: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

export const TabsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

export const TabButton = styled.button`
  background: ${(props) => (props.$active ? '#4caf50' : '#f0f0f0')};
  color: ${(props) => (props.$active ? 'white' : '#333')};
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background: ${(props) => (props.$active ? '#45a049' : '#ddd')};
  }
`;

export const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

// 樣式
export const TableContainer = styled.div`
    width: 100%;
    max-height: 80%;
    overflow-x: auto;
    overflow-y: auto;
    border: 1px solid #000000;
    border-radius: 8px;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    th, td {
      padding: 12px 16px;
      border-bottom: 1px solid #eee;
      text-align: center;
    }

    caption {
      font-size: 18px;
      font-weight: bold;
      padding: 12px;
    }
`;

export const Button = styled.button`
  padding: 6px 12px;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #d9363e;
  }
`;

export const Input = styled.input`
  padding: 6px 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PopupContent = styled.div`
  background: white;
  padding: 20px;
  width: 50%;
  height: 60%;
  max-width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

export const FileInput = styled.input`
  margin-top: 10px;
`;

export const InputWrapper = styled.div`
  padding: 20px;    
`;

export const InputContainer = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin-bottom: 8px;
    display: block;
    text-align: left;  /* 如果您希望标签文字左对齐 */
    padding: 4px 0;
`