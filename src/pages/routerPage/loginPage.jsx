import { Container, LoginContainer, Header, ErrorMessage, InputWrapper, Input, SubmitButton } from "./style";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault(); // Prevent page refresh
      // Submit logic, replace this with actual authentication logic
      console.log('Username:', username);
      console.log('Password:', password);
  
      // Example of setting an error message if login fails
      if (username === '' || password === '') {
        setErrorMessage('Please enter both username and password.');
      } else {
        // Clear the error message if inputs are valid
        setErrorMessage('');
        // Proceed with login logic (e.g., sending a request to the server)
      }
      navigate('/channel');
    };
  
    return (
      <Container>
        <LoginContainer>
          <Header>Login</Header>
  
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
  
          <form onSubmit={handleSubmit}>
            <InputWrapper>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update state
                required
              />
            </InputWrapper>
  
            <InputWrapper>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state
                required
              />
            </InputWrapper>
  
            <SubmitButton type="submit">Login</SubmitButton>
          </form>
        </LoginContainer>
      </Container>
    );
  };
  
  export default LoginPage;