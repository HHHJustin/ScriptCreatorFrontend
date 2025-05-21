import { React, useState, useEffect } from 'react';
import { ModalOverlay, ModalContent, 
TopWrapper, GoPreviousNode, GoNextNode, NodeTitle, ContentWrapper, TagArea, 
AddTagInput, Tag } from './modalStyle';
import FlexMessageDataArea from './dataArea/flexMessage';
import { useParams } from 'react-router-dom';

function FlexMessageNodeModal({ node, tags, onClose }) {
  const [newTag, setNewTag] = useState('');
  const [fetchedNode, setFetchedNode] = useState([]);
  const [flexMessages, setFlexMessages] = useState([]);
  const { channel } = useParams();

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

  const fetchFlexMessageData = async () => {
    try {
      const res = await fetch(`/api/${channel}/setting/flexMessagesEdit/fetchInfo`);
      const data = await res.json();
      const formattedMessages = Array.isArray(data)
        ? data.map(item => ({
            id: item.FlexMessage?.FlexMessageID,
            name: item.FlexMessage?.DataName
          }))
        : [];
      setFlexMessages(formattedMessages);
    } catch (err) {
      console.error('Fetch node info failed:', err);
    }
  };

  useEffect(() => {
    fetchFlexMessageData();
  }, [channel]);

  const handleAddTag = (tagText) => {
    console.log('新增標籤：', tagText);
  };
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
          <FlexMessageDataArea 
            node={node} 
            message={fetchedNode}
            flexMessages={flexMessages}
            onRefresh={fetchNodeDataAgain}
          />
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
}

export default FlexMessageNodeModal;