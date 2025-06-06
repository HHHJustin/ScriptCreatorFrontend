import { React, useState, useEffect } from 'react';
import { ModalOverlay, ModalContent, 
TopWrapper, GoPreviousNode, GoNextNode, NodeTitle, ContentWrapper, TagArea, 
AddTagInput, Tag } from './modalStyle';
import FlexMessageDataArea from './component/flexMessageDataArea';
import { useParams } from 'react-router-dom';
import EditableNodeTitle from './component/editableTitle';
import { handleTitleChange } from './hook/panel';
import useNodeInfo from './hook/useNodeInfo';

function FlexMessageNodeModal({ node, setNodes, tags, onClose }) {
  const [newTag, setNewTag] = useState('');
  const [flexMessages, setFlexMessages] = useState([]);
  const { channel } = useParams();
  const { fetchedNode, refresh } = useNodeInfo(node, channel);

  const fetchFlexMessageData = async () => {
    try {
      const res = await fetch(`/api/${channel}/setting/flexMessages/fetchInfo`);
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
            onRefresh={refresh}
          />
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
}

export default FlexMessageNodeModal;