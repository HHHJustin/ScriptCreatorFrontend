import { Container, LoginContainer, Header, ErrorMessage, InputWrapper, Input, SubmitButton } from "./style";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username === '' || password === '') {
      setErrorMessage('請輸入帳號與密碼。');
      return;
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          username,
          password
        }),
        credentials: "include" // 很重要：確保 server 設定的 cookie 存到瀏覽器
      });

      if (!res.ok) {
        if (res.status === 401) {
          setErrorMessage('帳號或密碼錯誤。');
        } else {
          setErrorMessage(`登入失敗 (HTTP ${res.status})`);
        }
        return;
      }

      // 登入成功
      console.log("success");
      setErrorMessage('');
      navigate('/channel');
    } catch (err) {
      console.error('登入請求錯誤:', err);
      setErrorMessage('無法連線到伺服器，請稍後再試。');
    }
  };

  return (
    <Container>
      <LoginContainer>
        <Header>登入</Header>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              type="text"
              name="username"
              placeholder="帳號"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputWrapper>

          <InputWrapper>
            <Input
              type="password"
              name="password"
              placeholder="密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputWrapper>

          <SubmitButton type="submit">登入</SubmitButton>
        </form>
      </LoginContainer>
    </Container>
  );
};

export default LoginPage;
