import { React, useState, useEffect } from 'react';
import {  ModalOverlay, ModalContent, 
TopWrapper, GoPreviousNode,  NodeTitle, ContentWrapper} from './modalStyle';
import KeywordDecisionDataArea from './component/keywordDecisionDataArea';
import { useParams } from 'react-router-dom';
import EditableNodeTitle from './component/editableTitle';
import { handleTitleChange } from './hook/panel';
import useNodeInfo from './hook/useNodeInfo';
import FilterTagEditor from './component/filterTag';

function KeywordDecisionNodeModal({ node, tags, onClose, setNodes, onRefreshTags, onNavigate, goToNode }) {
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
          <KeywordDecisionDataArea 
            node={node} 
            onGoNext={goToNode}
            message={fetchedNode} 
            onRefresh={refresh} 
          />
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
}

export default KeywordDecisionNodeModal;