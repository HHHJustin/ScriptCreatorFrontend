import { React, useState, useEffect } from 'react';
import { ModalOverlay, ModalContent, 
TopWrapper, GoPreviousNode, BranchGoNextNode, NodeTitle, 
ContentWrapper, TagArea, AddTagInput, Tag } from './modalStyle';
import EditableNodeTitle from './component/editableTitle';
import { handleTitleChange } from './hook/panel';
import TagDecisionDataArea from './component/tagDecsionDataArea';
import { useParams } from 'react-router-dom';
import useNodeInfo from './hook/useNodeInfo';

function TagDecisionNodeModal({ node, tags, onClose, setNodes }) {
  const [newTag, setNewTag] = useState('');
  const { channel } = useParams();
  const { fetchedNode, refresh } = useNodeInfo(node, channel);
  const [fetchedTag, setFetchTag] = useState([]);

  const handleAddTag = (tagText) => {
    console.log('新增標籤：', tagText);
  };
  const fetchTagData = async () => {
    try {
      const res = await fetch(`/api/${channel}/setting/tagNodes/fetchInfo`);
      const data = await res.json();
      const formattedTags = Array.isArray(data)
        ? data.map(item => ({
            id: item.Tag?.TagID,
            name: item.Tag?.TagName
          }))
        : [];
        setFetchTag(formattedTags);
    } catch (err) {
      console.error('Fetch node info failed:', err);
    }
  };

  useEffect(() => {
    fetchTagData();
  }, [channel]);
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
          <TagDecisionDataArea 
            node={node} 
            messages={fetchedNode} 
            tags={fetchedTag}
            onRefresh={refresh} />
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
}

export default TagDecisionNodeModal;