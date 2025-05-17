import TagSettingPage from "./tag/tagSettingPage";
import RichMenuSettingPage from "./richMenu/richMenuPage";
import UploadImageSettingPage from "./uploadImage/uploadImagePage"
import FlexMessageSettingPage from "./flexMessage/flexMessagePage";
import LineBotSettingPage from "./lineBotSetting/lineBotSettingPage";

export const RenderCurrentPage = ({ currentTab }) => {
  switch (currentTab) {
    case 'tab1':
      return <TagSettingPage />;
    case 'tab2':
      return <RichMenuSettingPage />;
    case 'tab3':
      return <UploadImageSettingPage />;
    case 'tab4':
      return <FlexMessageSettingPage />;
    case 'tab5':
      return <LineBotSettingPage />;
    default:
      return <div>請選擇一個分頁</div>;
  }
};