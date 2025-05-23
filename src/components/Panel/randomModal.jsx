import { React, useState, useEffect } from 'react';
import { DataAreaWrapper, Table, Th, Td, Tr, ModalOverlay, ModalContent, 
TopWrapper, GoPreviousNode, BranchGoNextNode, NodeTitle, ContentWrapper, 
TagArea, AddTagInput, Tag } from './modalStyle';
import RandomDataArea from './dataArea/random';
import { useParams } from 'react-router-dom';

function RandomNodeModal({ node, tags, onClose }) {
  const [newTag, setNewTag] = useState('');
  const { channel } = useParams();
  const handleAddTag = (tagText) => {
    console.log('新增標籤：', tagText);
  };
  const [fetchedNode, setFetchedNode] = useState([]);
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
          <RandomDataArea node={node} onGoNext={(id) => { console.log('你點到了 id:', id);}}
           message={fetchedNode} onRefresh={fetchNodeDataAgain}/>
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
}

export default RandomNodeModal;