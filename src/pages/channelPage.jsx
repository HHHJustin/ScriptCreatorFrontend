import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableContainer, Table, TableHeader, TableRow, TableCell, Button, FloatingButton} from './style'; // 引入样式

const ChannelPage = ({ channels }) => {
  const navigate = useNavigate();

  const handleGoToChannel = (channelID) => {
    navigate(`/home`);  // 页面跳转
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>編號</TableHeader>
            <TableHeader>頻道名稱</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {channels.length > 0 ? (
            channels.map((channel) => (
              <TableRow key={channel.ChannelID}>
                <TableCell>{channel.ChannelID}</TableCell>
                <TableCell onClick={() => makeChannelNameEditable(channel.ChannelID)}>{channel.ChannelName}</TableCell>
                <TableCell>
                  <Button onClick={() => handleGoToChannel(channel.ChannelID)}>前往</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="3">沒有建立任何頻道</TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>
      <FloatingButton onClick={() => console.log('新增頻道')}>+</FloatingButton>
    </TableContainer>
   
  );
};

export default ChannelPage;
