import { React, useState, useEffect } from 'react';
import {  ModalOverlay, ModalContent, 
TopWrapper, GoPreviousNode,
NodeTitle, ContentWrapper, 
TagArea, AddTagInput, Tag } from './modalStyle';
import RandomDataArea from './component/randomDataArea';
import { useParams } from 'react-router-dom';
import EditableNodeTitle from './component/editableTitle';
import { handleTitleChange } from './hook/panel';
import useNodeInfo from './hook/useNodeInfo';
import FilterTagEditor from './component/filterTag';

function RandomNodeModal({ node, tags, onClose, setNodes, onRefreshTags }) {
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
        <FilterTagEditor
          tags={tags}
          node={node}
          channel={channel}
          onRefreshTags={onRefreshTags}
        />
          <RandomDataArea 
            node={node} 
            onGoNext={(id) => { console.log('你點到了 id:', id);}}
            message={fetchedNode} 
            onRefresh={refresh}/>
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
}

export default RandomNodeModal;