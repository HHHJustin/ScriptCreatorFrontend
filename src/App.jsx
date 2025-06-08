import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import 'reactflow/dist/style.css';
import HomePage from './pages/routerPage/homePage';
import SettingPage from './pages/routerPage/settingPage';
import LoginPage from './pages/routerPage/loginPage';
import ChannelPage from './pages/routerPage/channelPage';

const App = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChannels = async () => {
    try {
      const res = await fetch('/api/channels'); // 如果是 /channels 就改成那樣
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
    <Router>
      <Routes>
        {/* 主畫面 */}
        <Route path="/:channel/home" element={<HomePage />} />

        {/* 設定頁面 */}
        <Route path="/:channel/setting" element={<SettingPage />} />

        {/* 登入頁面 */}
        <Route path="/" element={<LoginPage />} />

        {/* 頻道選擇頁面 */}
        <Route path="/channel" element={<ChannelPage channels={channels} loading={loading}/>} />
      </Routes>
    </Router>
  );
}

export default App;