import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import 'reactflow/dist/style.css';
import HomePage from './pages/HomePage';
import SettingPage from './pages/settingPage/setting';
import LoginPage from './pages/loginPage';
import ChannelChoicePage from './pages/channelChoicePage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 主畫面 */}
        <Route path="/" element={<HomePage />} />

        {/* 設定頁面 */}
        <Route path="/setting" element={<SettingPage />} />

        {/* 登入頁面 */}
        <Route path="/login" element={<LoginPage />} />

        {/* 頻道選擇頁面 */}
        <Route path="/channel" element={<ChannelChoicePage />} />
      </Routes>
    </Router>
  );
}

export default App;