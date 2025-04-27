import { SettingOverlay, SettingWrapper, TabsWrapper, TabButton, ContentArea  } from "../settingPage/style";
import { RenderCurrentPage } from "../settingPage/render";
import { useState } from "react";
import { useParams } from 'react-router-dom';


const SettingPage = () => {
  const { channel } = useParams();  // 這裡就拿到網址上的 channel
  console.log('現在是 channel:', channel);
  const [currentTab, setCurrentTab] = useState('tab1');
    return (
      <SettingOverlay>
        <SettingWrapper>
          {/* 四個按鈕 */}
          <TabsWrapper>
            <TabButton $active={currentTab === 'tab1'} onClick={() => setCurrentTab('tab1')}>標籤設定</TabButton>
            <TabButton $active={currentTab === 'tab2'} onClick={() => setCurrentTab('tab2')}>圖文選單設定</TabButton>
            <TabButton $active={currentTab === 'tab3'} onClick={() => setCurrentTab('tab3')}>彈性模板設定</TabButton>
            <TabButton $active={currentTab === 'tab4'} onClick={() => setCurrentTab('tab4')}>LineBot設定</TabButton>
          </TabsWrapper>
  
          {/* 顯示內容 */}
          <ContentArea>
            <RenderCurrentPage currentTab={currentTab} />
          </ContentArea>
        </SettingWrapper>
      </SettingOverlay>
    );
  };


export default SettingPage;