import styled from 'styled-components';

// Styled-components for styles
export const Container = styled.div`
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f3f4f6;
`;

export const LoginContainer = styled.div`
  width: 350px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const Header = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

export const InputWrapper = styled.div`
  margin-bottom: 15px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #dddddd;
  border-radius: 6px;
  font-size: 14px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const RegisterButton = styled.button`
  margin-top: 10px;
  background-color: #6c757d;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;

export const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    margin-bottom: 15px;
`;

export const TableContainer = styled.div`
    font-family: Arial, sans-serif;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 10;
    background-color: #f0f0f0;
    overflow-y: auto;
    padding: 20px;
`;

export const Table = styled.table`
    width: 50%;
    border-collapse: collapse;
    margin: 15vh 0 5vh 0;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    th, td {
        padding: 12px 12px;
        border-bottom: 1px solid #ffffff;
        text-align: center;
    }
`;

export const TableHeader = styled.th`
    text-align: center;
    padding: 8px;
    background-color: #ffffff;
    font-size: 16px;
`;

export const TableCell = styled.td`
    text-align: center;
    padding: 8px;
    cursor: pointer;
    font-size: 16px;
`;

export const TableRow = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

export const Caption = styled.caption`
  caption-side: top;
  font-size: 1.5em;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  color:#000;
  font-size: 16px;
  &:hover {
    background-color: #eeeeee;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  background-color: #f0f0f0;
`;

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background-color: #4caf50;
  color: white;
  font-size: 28px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;
