import styled from 'styled-components';

/* ======= Overlay & Wrapper ======= */
export const SettingOverlay = styled.div`
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

/* ======= Tabs ======= */
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

/* ======= Table ======= */
export const TableContainer = styled.div`
  width: 100%;
  max-height: 80%;
  overflow-x: auto;
  overflow-y: auto;
  border: 1px solid #000;
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

/* ======= Inputs & Buttons ======= */
export const Button = styled.button`
  padding: 6px 12px;
  background: #4f92ff; /* 柔和藍色 */
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #3c78d8; /* 深一點的藍色 */
  }
`;

export const Input = styled.input`
  padding: 6px 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
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
  text-align: left;
  padding: 4px 0;
`;

/* ======= Popup ======= */
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
  background: #fff;
  padding: 24px 32px;
  width: 480px;
  max-width: 90%;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 16px;

  h3 {
    margin-top: 12px;
    font-size: 18px;
    color: #333;
  }

  label {
    font-weight: 600;
    margin-bottom: 4px;
    color: #555;
  }

  input[type='text'] {
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 14px;
  }

  textarea {
    border-radius: 6px;
    border: 1px solid #ccc;
    font-family: monospace;
    padding: 8px;
    font-size: 14px;
  }

  button {
    margin-top: 6px;
    padding: 8px 14px;
    border-radius: 6px;
    border: none;
    background: #4f92ff;
    color: #fff;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #3c78d8;
    }
  }
`;

export const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 6px;
  background-color: #4caf50;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #45a049;
  }
`;
