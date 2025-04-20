import React, { useState } from 'react';
import { InputContainer, InputWrapper, Label, Input, Button, TableContainer } from '../style';

const LineBotSettingPage = () => {
  const [channelSecret, setChannelSecret] = useState('');
  const [channelToken, setChannelToken] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh
    console.log('Channel Secret:', channelSecret);
    console.log('Channel Access Token:', channelToken);
    // You can handle the form submission here, e.g., send data to the server
  };

  return (
    <TableContainer>
      <form id="configForm" onSubmit={handleSubmit}>
        <InputWrapper>
          <Label htmlFor="channelSecret">Channel Secret Key:</Label>
          <InputContainer>
            <Input
              type="text"
              id="channelSecret"
              name="channelSecret"
              placeholder=" 輸入 Channel Secret Key"
              value={channelSecret}
              onChange={(e) => setChannelSecret(e.target.value)} // Update state
              required
            />
          </InputContainer>
          <Label htmlFor="channelToken">Channel Access Token:</Label>
          <InputContainer>
            <Input
              type="text"
              id="channelToken"
              name="channelToken"
              placeholder=" 輸入 Channel Access Token"
              value={channelToken}
              onChange={(e) => setChannelToken(e.target.value)} // Update state
              required
            />
          </InputContainer>
          <Button type="submit">提交</Button>
        </InputWrapper>
      </form>
    </TableContainer>
  );
};

export default LineBotSettingPage;