import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableContainer, Table, TableHeader, TableRow, TableCell, Button, FloatingButton } from './style';
import addChannel from './hooks/channelPage';

export default function ChannelPage() {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");
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

  const handleRename = async (channelID) => {
    try {
      const res = await fetch(`/api/${channelID}/rename`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ channelName: newName }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("❌ Failed to rename:", error);
      } else {
        console.log("✅ Rename success");
        setChannels((prev) =>
          prev.map((ch) =>
            ch.ChannelID === channelID
              ? { ...ch, ChannelName: newName }
              : ch
          )
        );
      }
    } catch (err) {
      console.error("❌ Error renaming:", err);
    }
  };

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
                <TableCell>
                  {editingId === channel.ChannelID ? (
                    <input
                    autoFocus
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setEditingId(null); // 先結束編輯
                        handleRename(channel.ChannelID);
                      }
                      if (e.key === "Escape") {
                        setEditingId(null);
                      }
                    }}
                    onBlur={() => setEditingId(null)}
                    style={{ width: "100%" }}
                  />
                  ) : (
                    <span
                      onClick={() => {
                        setEditingId(channel.ChannelID);
                        setNewName(channel.ChannelName);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {channel.ChannelName}
                    </span>
                  )}
                </TableCell>
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
      <FloatingButton onClick={() => addChannel(navigate)}>+</FloatingButton>
    </TableContainer>
  );
}
