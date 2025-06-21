import { React, useState, useEffect } from 'react';
import { ModalOverlay, ModalContent, 
  TopWrapper, GoPreviousNode, GoNextNode, NodeTitle, 
  ContentWrapper, TagArea, AddTagInput, Tag } from './modalStyle';
import TagOperationDataArea from './component/tagOperationDataArea';
import { useParams } from 'react-router-dom';
import EditableNodeTitle from './component/editableTitle';
import { handleTitleChange } from './hook/panel';
import useNodeInfo from './hook/useNodeInfo';
import FilterTagEditor from './component/filterTag';

function TagOperationModal({ node, tags, onClose, setNodes, onRefreshTags }) {
  const { channel } = useParams();
  const [ newTag, setNewTag] = useState('');
  const [fetchedTag, setFetchTag] = useState([]);
  const handleAddTag = (tagText) => {
    console.log('新增標籤：', tagText);
  };
  const { fetchedNode, refresh } = useNodeInfo(node, channel);

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
          <GoNextNode>▶︎</GoNextNode>
        </TopWrapper>
        <ContentWrapper>
        <FilterTagEditor
          tags={tags}
          node={node}
          channel={channel}
          onRefreshTags={onRefreshTags}
        />
          <TagOperationDataArea 
            node={node}
            messages={fetchedNode}
            tags={fetchedTag}
            onRefresh={refresh} 
          />
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
}

export default TagOperationModal;