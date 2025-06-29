import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import 'reactflow/dist/style.css';
import HomePage from './pages/routerPage/homePage';
import SettingPage from './pages/routerPage/settingPage';
import LoginPage from './pages/routerPage/loginPage';
import ChannelPage from './pages/routerPage/channelPage';

const App = () => {

  return (
    <Router>
      <Routes>
        {/* 登入頁面 */}
        <Route path="/" element={<LoginPage />} />

        {/* 需要登入的頁面 */}
        <Route
          path="/channel"
          element={
              <ChannelPage />
          }
        />
        <Route
          path="/:channel/home"
          element={
              <HomePage />
          }
        />
        <Route
          path="/:channel/setting"
          element={
              <SettingPage />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
