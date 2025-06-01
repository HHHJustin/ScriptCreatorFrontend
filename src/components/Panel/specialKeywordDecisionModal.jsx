import { React, useState } from 'react';
import {  ModalOverlay, ModalContent, 
TopWrapper, GoPreviousNode, ContentWrapper, TagArea, AddTagInput, Tag } from './modalStyle';
import { handleTitleChange } from './hook/panel';
import SpecialKeywordDecisionDataArea from './component/specialKeywordDecisionDataArea';
import EditableNodeTitle from './component/editableTitle';
import { useParams } from 'react-router-dom';
import useNodeInfo from './hook/useNodeInfo';

function SpecialKeywordDecisionNodeModal({ node, tags, onClose, setNodes }) {
  const [newTag, setNewTag] = useState('');
  const { channel } = useParams();
  const handleAddTag = (tagText) => {
    console.log('新增標籤：', tagText);
  };
  const { fetchedNode, refresh } = useNodeInfo(node, channel);

  if (!node) return null;
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <TopWrapper>
          <GoPreviousNode>◀︎</GoPreviousNode>
          <EditableNodeTitle 
            node={node}
            onTitleChange={handleTitleChange} 
            setNodes={setNodes}
            channel={channel}
          />
        </TopWrapper>
        <ContentWrapper>
          <TagArea>
            <AddTagInput
              type="text"
              placeholder="新增標籤..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newTag.trim() !== '') {
                  handleAddTag(newTag.trim());
                  setNewTag(''); // 清空輸入框
                }
              }}
            />
            {tags.map((tag) => {
              const activeTags = node.data.tags ? node.data.tags.split(',').map(t => t.trim()) : [];
              const isActive = activeTags.includes(tag.tag);
              return (
                <Tag key={tag.id} $active={isActive}>
                  {tag.tag}
                </Tag>
              );
            })}
          </TagArea>
          <SpecialKeywordDecisionDataArea 
            node={node} 
            onGoNext={(id) => { console.log('你點到了 id:', id);}}
            message={fetchedNode} 
            onRefresh={refresh} />
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
}

export default SpecialKeywordDecisionNodeModal;