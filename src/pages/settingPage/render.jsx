import FlexMessageSettingPage from "./flexMessage/flexMessagePage";
import LineBotSettingPage from "./lineBotSetting/lineBotSettingPage";
import RichMenuSettingPage from "./richMenu/richMenuPage";
import TagSettingPage from "./tag/tagSettingPage";

export const RenderCurrentPage = ({ currentTab }) => {
  switch (currentTab) {
    case 'tab1':
      return <TagSettingPage />;
    case 'tab2':
      return <RichMenuSettingPage />;
    case 'tab3':
      return <FlexMessageSettingPage />;
    case 'tab4':
      return <LineBotSettingPage />;
    default:
      return <div>請選擇一個分頁</div>;
  }
};