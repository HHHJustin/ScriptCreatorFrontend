import { React, useState, useEffect } from 'react';
import MessageDataArea from './dataArea/message';
import { ModalOverlay, ModalContent, 
TopWrapper, GoPreviousNode, GoNextNode, NodeTitle, ContentWrapper, TagArea, AddTagInput, Tag } from './modalStyle';
import { useParams } from 'react-router-dom';

function MessageNodeModal({ node, tags, onClose }) {
  const { channel } = useParams();
  const [newTag, setNewTag] = useState('');
  const [fetchedNode, setFetchedNode] = useState([]);

  const handleAddTag = (tagText) => {
    console.log('新增標籤：', tagText);
  };

  const fetchNodeDataAgain = async () => {
    if (!node) return;
    try {
      const res = await fetch(`/api/${channel}/${node.id}/fetchInfo`);
      const data = await res.json();
      setFetchedNode(data); 
    } catch (err) {
      console.error('Fetch node info failed:', err);
    }
  };

  useEffect(() => {
    fetchNodeDataAgain();
  }, [node, channel]);

  if (!node) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <TopWrapper>
          <GoPreviousNode>◀︎</GoPreviousNode>
          <NodeTitle>{node.data.title}</NodeTitle>
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
            onRefresh={fetchNodeDataAgain}
          />
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
}

export default MessageNodeModal;
