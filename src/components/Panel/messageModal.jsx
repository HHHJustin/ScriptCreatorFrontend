import { React, useState, useEffect } from 'react';
import MessageDataArea from './component/messageDataArea';
import { ModalOverlay, ModalContent, 
TopWrapper, GoPreviousNode, GoNextNode, 
NodeTitle, ContentWrapper, TagArea, AddTagInput, Tag } from './modalStyle';
import { useParams } from 'react-router-dom';
import EditableNodeTitle from './component/editableTitle';
import { handleTitleChange } from './hook/panel';
import useNodeInfo from './hook/useNodeInfo';
import FilterTagEditor from './component/filterTag';

function MessageNodeModal({ node, tags, onClose, setNodes, onRefreshTags, onNavigate, goToNode}) {
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
          <GoNextNode onClick={() => onNavigate && onNavigate('next')}>▶︎</GoNextNode>
        </TopWrapper>
        <ContentWrapper>
        <FilterTagEditor
          tags={tags}
          node={node}
          channel={channel}
          onRefreshTags={onRefreshTags}
        />
          <MessageDataArea
            node={node}
            message={fetchedNode}
            onRefresh={refresh}
            onGoNext={goToNode}
          />
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
}

export default MessageNodeModal;
