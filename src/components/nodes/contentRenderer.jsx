import MessageNode from './message';
import KeywordDecisionNode from './keywordDecision';
import QuickReplyNode from './quickReply';
import TagOperationNode from './tagOperation';
import RandomNode from './random';
import TagDecisionNode from './tagDecision';
import SpecialKeywordDecisionNode from './specialKeyword';
import RichMenuNode from './richMenu';
import FlexMessageNode from './flexMessage';
import FirstStepNode from './firstStep';

const typeComponentMap = {
  訊息: MessageNode,
  關鍵字判定: KeywordDecisionNode,
  快速回覆: QuickReplyNode,
  標籤操作: TagOperationNode,
  隨機: RandomNode,
  標籤判定: TagDecisionNode,
  特殊關鍵字: SpecialKeywordDecisionNode,
  開啟選單: RichMenuNode,
  關閉選單: RichMenuNode,
  彈性模板: FlexMessageNode,
  入口: FirstStepNode,
};


function ContentRenderer({ type, messages, tags, richMenus, flexMessages }) {
  const Component = typeComponentMap[type];
  if (!Component || !messages || messages.length === 0) return null;

  // 特例：標籤判定需要 tags
  if (type === '標籤判定') {
    return <Component messages={messages} tags={tags} />;
  }

  if (type === '開啟選單') {
    return <Component messages={messages} richMenus={richMenus} />;
  }

  if (type === '彈性模板') {
    return <Component messages={messages} flexMessages={flexMessages} />;
  }
  return <Component messages={messages} />;
}

export default ContentRenderer;
