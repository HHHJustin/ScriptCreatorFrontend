import { React, useState, useEffect } from 'react';
import MessageDataArea from './component/messageDataArea';
import { ModalOverlay, ModalContent, 
TopWrapper, GoPreviousNode, GoNextNode, 
NodeTitle, ContentWrapper, TagArea, AddTagInput, Tag } from './modalStyle';
import { useParams } from 'react-router-dom';
import EditableNodeTitle from './component/editableTitle';
import { handleTitleChange } from './hook/panel';
import useNodeInfo from './hook/useNodeInfo';

function MessageNodeModal({ node, tags, onClose, setNodes}) {
  const { channel } = useParams();
  const [newTag, setNewTag] = useState('');
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
          <GoNextNode>▶︎</GoNextNode>
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
                  setNewTag('');
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
          <MessageDataArea
            node={node}
            message={fetchedNode}
            onRefresh={refresh}
          />
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
}

export default MessageNodeModal;
