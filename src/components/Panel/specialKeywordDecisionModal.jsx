import { React, useState } from 'react';
import {  ModalOverlay, ModalContent, 
TopWrapper, GoPreviousNode, ContentWrapper, TagArea, AddTagInput, Tag } from './modalStyle';
import { handleTitleChange } from './hook/panel';
import SpecialKeywordDecisionDataArea from './component/specialKeywordDecisionDataArea';
import EditableNodeTitle from './component/editableTitle';
import { useParams } from 'react-router-dom';
import useNodeInfo from './hook/useNodeInfo';
import FilterTagEditor from './component/filterTag';

function SpecialKeywordDecisionNodeModal({ node, tags, onClose, setNodes, onRefreshTags, onNavigate, goToNode }) {
  const { channel } = useParams();

  const { fetchedNode, refresh } = useNodeInfo(node, channel);

  if (!node) return null;
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <TopWrapper>
          <GoPreviousNode onClick={(e) => onNavigate && onNavigate('prev', e)}>◀︎</GoPreviousNode>
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
          <SpecialKeywordDecisionDataArea 
            node={node} 
            onGoNext={goToNode}
            message={fetchedNode} 
            onRefresh={refresh} />
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
}

export default SpecialKeywordDecisionNodeModal;