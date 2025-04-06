import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import 'reactflow/dist/style.css';
import HomePage from './pages/HomePage';
// 編輯Node的頁面
import MessagePage from './pages/editNodePage/MessagePage';
import KeywordDecisionPage from './pages/editNodePage/KeywordDecisionPage';
import SpecialKeywordDecisionPage from './pages/editNodePage/SpecialKeywordDecisionPage';
import QuickReplyPage from './pages/editNodePage/QuickReplyPage';
import TagDecisionPage from './pages/editNodePage/TagDecisionPage';
import TagOperationPage from './pages/editNodePage/TagOperationPage';
import RichMenuPage from './pages/editNodePage/RichMenuPage';
import FlexMessagePage from './pages/editNodePage/FlexMessagePage';
import RandomPage from './pages/editNodePage/RandomPage';

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

        {/* 編輯節點 */}
        <Route path="/message" element={<MessagePage />} />
        <Route path="/keyword" element={<KeywordDecisionPage />} />
        <Route path="/specialkeyword" element={<SpecialKeywordDecisionPage />} />
        <Route path="/quickreply" element={<QuickReplyPage />} />
        <Route path="/tagdecision" element={<TagDecisionPage />} />
        <Route path="/tagoperation" element={<TagOperationPage />} />
        <Route path="/richmenu" element={<RichMenuPage />} />
        <Route path="/flexmessage" element={<FlexMessagePage />} />
        <Route path="/random" element={<RandomPage />} />

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