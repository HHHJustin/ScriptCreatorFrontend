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
  圖文選單: RichMenuNode,
  彈性模板: FlexMessageNode,
  入口: FirstStepNode,
};

const typeTransferMap = {
  Message: '訊息',
  KeywordDecision: '關鍵字判定',
  QuickReply: '快速回覆',
  TagOperation: '標籤操作',
  Random: '隨機',
  TagDecision: '標籤判定',
  SpecialKeywordDecision: '特殊關鍵字',
  RichMenu: '圖文選單',
  FlexMessage: '彈性模板',
  FirstStep: '入口',
};

function ContentRenderer({ type, messages }) {
  const transferredType = typeTransferMap[type] || type; 
  const Component = typeComponentMap[transferredType];
  if (!Component || !messages || messages.length === 0) return null;
  return <Component messages={messages} />;
}

export default ContentRenderer;
