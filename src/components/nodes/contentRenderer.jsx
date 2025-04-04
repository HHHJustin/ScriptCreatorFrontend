// components/ContentRenderer.jsx
import MessageNode from './message';
import KeywordDecisionNode from './keywordDecision';
import QuickReplyNode from './quickReply';
import TagOperationNode from './tagOperation';
import RandomNode from './random';
import TagDecisionNode from './tagDecision';
import SpecialKeywordDecisionNode from './specialKeyword';
import RichMenuNode from './richMenu';
import FlexMessageNode from './flexMessage';
// 你未來還可以 import 更多...

const typeComponentMap = {
  訊息: MessageNode,
  關鍵字判定: KeywordDecisionNode,
  快速回覆: QuickReplyNode,
  標籤操作: TagOperationNode,
  隨機: RandomNode,
  標籤判定: TagDecisionNode,
  特殊關鍵字: SpecialKeywordDecisionNode,
  圖文選單: RichMenuNode,
  彈性模板: FlexMessageNode,
  
  // ⬇️ 未來新增其他 type
  // 圖片: ImageNode,
  // 表單: FormNode,
};

function ContentRenderer({ type, messages }) {
  const Component = typeComponentMap[type];
  if (!Component || !messages || messages.length === 0) return null;

  return <Component messages={messages} />;
}

export default ContentRenderer;
