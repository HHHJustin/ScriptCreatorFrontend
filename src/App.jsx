import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import 'reactflow/dist/style.css';
import HomePage from './pages/routerPage/homePage';
import SettingPage from './pages/routerPage/settingPage';
import LoginPage from './pages/routerPage/loginPage';
import ChannelPage from './pages/routerPage/channelPage';

const App = () => {
  const channels = [
    { ChannelID: 1, ChannelName: '頻道 1' },
    { ChannelID: 2, ChannelName: '頻道 2' },
  ];
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
        <Route path="/channel" element={<ChannelPage channels={channels} />} />
      </Routes>
    </Router>
  );
}

export default App;