import { React, useState } from 'react';
import { ModalOverlay, ModalContent, 
TopWrapper, GoPreviousNode, GoNextNode, NodeTitle, ContentWrapper, TagArea, AddTagInput, Tag } from './modalStyle';
import EditableNodeTitle from './component/editableTitle';
import { useParams } from 'react-router-dom';
import { handleTitleChange } from './hook/panel';
import FilterTagEditor from './component/filterTag';

function FirstStepNodeModal({ node, setNodes, tags, onClose, onRefreshTags, onNavigate}) {
  const { channel } = useParams();
  if (!node) return null;
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <TopWrapper>
          <EditableNodeTitle 
            node={node}
            onTitleChange={handleTitleChange} 
            setNodes={setNodes}
            channel={channel}
          />
           <GoNextNode onClick={() => onNavigate && onNavigate('next')}>▶︎</GoNextNode>
        </TopWrapper>
        <ContentWrapper>
        <FilterTagEditor
          tags={tags}
          node={node}
          channel={channel}
          onRefreshTags={onRefreshTags}
        />
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
}

export default FirstStepNodeModal;