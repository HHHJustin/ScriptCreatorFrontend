import { React, useState, useEffect } from 'react';
import { ModalOverlay, ModalContent, 
TopWrapper, GoPreviousNode, GoNextNode, NodeTitle, ContentWrapper, TagArea, 
AddTagInput, Tag } from './modalStyle';
import FlexMessageDataArea from './component/flexMessageDataArea';
import { useParams } from 'react-router-dom';
import EditableNodeTitle from './component/editableTitle';
import { handleTitleChange } from './hook/panel';
import useNodeInfo from './hook/useNodeInfo';
import FilterTagEditor from './component/filterTag';

function FlexMessageNodeModal({ node, setNodes, tags, onClose, onRefreshTags, onNavigate, goToNode }) {
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