import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableContainer, Table, TableHeader, TableRow, TableCell, Button, FloatingButton } from './style';

export default function ChannelPage() {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChannels = async () => {
    try {
      const res = await fetch('/api/channels', {
        credentials: "include"
      });

      if (res.status === 401) {
        // 沒有登入，導回登入頁
        navigate('/');
        return;
      }

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      setChannels(data.channels);
    } catch (err) {
      console.error('無法取得頻道清單:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  if (loading) return <div>載入中...</div>;

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
                <TableCell>{channel.ChannelName}</TableCell>
                <TableCell>
                  <Button onClick={() => navigate(`/${channel.ChannelID}/home`)}>前往</Button>
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
}
