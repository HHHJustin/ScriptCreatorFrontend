import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import 'reactflow/dist/style.css';
import HomePage from './pages/HomePage';


// 設定Setting的頁面
import LineBotSetting from './pages/settingPage/lineBotSetting';
import TagSetting from './pages/settingPage/tagSetting';
import RichMenuSetting from './pages/settingPage/richmenuSetting';
import FlexMessageSetting from './pages/settingPage/flexMessageSetting';
import FirstStepSetting from './pages/settingPage/firstStepSetting';
import AddSpecialKeyword from './pages/settingPage/addSpecialKeyword';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 主畫面 */}
        <Route path="/" element={<HomePage />} />

        {/* 設定頁面 */}
        <Route path="/setting/linebot" element={<LineBotSetting />} />
        <Route path="/setting/tag" element={<TagSetting />} />
        <Route path="/setting/richmenu" element={<RichMenuSetting />} />
        <Route path="/setting/flexmessage" element={<FlexMessageSetting />} />
        <Route path="/setting/firststep" element={<FirstStepSetting />} />
        <Route path="/addspecialkeyword" element={<AddSpecialKeyword />} />
      </Routes>
    </Router>
  );
}

export default App;