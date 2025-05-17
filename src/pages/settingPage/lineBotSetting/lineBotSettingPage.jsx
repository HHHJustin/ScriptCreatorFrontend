import React, { useState } from 'react';
import { InputContainer, InputWrapper, Label, Input, Button, TableContainer } from '../style';
import { useParams } from 'react-router-dom';

const LineBotSettingPage = () => {
  const [channelSecret, setChannelSecret] = useState('');
  const [channelToken, setChannelToken] = useState('');
  const { channel } = useParams();
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page refresh
    try {
      const res = await fetch(`/api/${channel}/setting/lineBot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelSecretKey: channelSecret,
          channelAccessToken: channelToken,
        }),
      });
      if (res.ok) {
        alert(`更新成功`);
      } else {
        const errorText = await res.text();
        console.error('更新失敗:', errorText);
        alert(`更新失敗：\n${errorText}`);
      }
    } catch (err) {
      console.error('更新錯誤:', err);
      alert('更新失敗');
    }
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