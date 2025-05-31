// panels/renderModalByType.jsx
import MessageNodeModal from "./messageModal";
import QuickReplyNodeModal from "./quickReplyModal";
import FlexMessageNodeModal from "./flexMessageModal";
import KeywordDecisionNodeModal from "./keywordDecisionModal";
import RandomNodeModal from "./randomModal";
import FirstStepNodeModal from "./firstStepModal";
import RichMenuNodeModal from "./richMenuModal";
import SpecialKeywordDecisionNodeModal from "./specialKeywordDecisionModal";
import TagDecisionNodeModal from "./tagDecisionModal";
import TagOperationModal from "./tagOperationModal";

export const renderModalByType = (node, setNodes, tagList, handleCloseModal) => {
  if (!node) return null;

  switch (node.data.type) {
    case '訊息':
      return <MessageNodeModal node={node} setNodes={setNodes} tags={tagList} onClose={handleCloseModal} />;
    case '關鍵字判定':
      return <KeywordDecisionNodeModal node={node} setNodes={setNodes} tags={tagList} onClose={handleCloseModal} />;
    case '快速回覆':
      return <QuickReplyNodeModal node={node} setNodes={setNodes} tags={tagList} onClose={handleCloseModal} />;
    case '彈性模板':
      return <FlexMessageNodeModal node={node} setNodes={setNodes} tags={tagList} onClose={handleCloseModal} />;
    case '隨機':
      return <RandomNodeModal node={node} setNodes={setNodes} tags={tagList} onClose={handleCloseModal} />;
    case '入口':
      return <FirstStepNodeModal node={node} setNodes={setNodes} tags={tagList} onClose={handleCloseModal} />;
    case '開啟選單':
      return <RichMenuNodeModal node={node} setNodes={setNodes} tags={tagList} onClose={handleCloseModal} />;
    case '關閉選單':
      return <RichMenuNodeModal node={node} setNodes={setNodes} tags={tagList} onClose={handleCloseModal} />;
    case '特殊關鍵字':
      return <SpecialKeywordDecisionNodeModal node={node} setNodes={setNodes} tags={tagList} onClose={handleCloseModal} />;
    case '標籤判定':
      return <TagDecisionNodeModal node={node} setNodes={setNodes} tags={tagList} onClose={handleCloseModal} />;
    case '標籤操作':
      return <TagOperationModal node={node} setNodes={setNodes} tags={tagList} onClose={handleCloseModal} />;
    default:
      return null;
  }
};
