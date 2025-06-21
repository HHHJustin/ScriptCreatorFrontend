import { React, useState, useEffect } from 'react';
import { ModalOverlay, ModalContent, TopWrapper, GoPreviousNode, GoNextNode, 
  ContentWrapper, TagArea, AddTagInput, Tag } from './modalStyle';
import { useParams } from 'react-router-dom';
import RichMenuDataArea from './component/richMenuDataArea';
import EditableNodeTitle from './component/editableTitle';
import { handleTitleChange } from './hook/panel';
import useNodeInfo from './hook/useNodeInfo';
import FilterTagEditor from './component/filterTag';

function RichMenuNodeModal({ node, tags, onClose, setNodes, onRefreshTags }) {
  const [ newTag, setNewTag] = useState('');
  const { channel } = useParams();
  const [fetchedRichMenu, setFetchRichMenu] = useState([]);

  const { fetchedNode, refresh } = useNodeInfo(node, channel);


  const fetchRichMenuData = async () => {
    try {
      const res = await fetch(`/api/${channel}/setting/richMenus/fetchInfo`);
      const data = await res.json();
      const formattedRichMenus = Array.isArray(data)
        ? data.map(item => ({
            id: item.RichMenu?.MenuID,
            name: item.RichMenu?.RichMenuName
          }))
        : [];
        setFetchRichMenu(formattedRichMenus);
    } catch (err) {
      console.error('Fetch node info failed:', err);
    }
  };

  useEffect(() => {
    fetchRichMenuData();
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
        <FilterTagEditor
          tags={tags}
          node={node}
          channel={channel}
          onRefreshTags={onRefreshTags}
        />
           {/* 根據 node.type 顯示 RichMenuDataArea 或是顯示文字 */}
           {node.data.type === '關閉選單' ? (
            <div>無需任何資料</div> // 顯示文字，無需資料
          ) : (
            <RichMenuDataArea 
              node={node} 
              messages={fetchedNode}
              richMenus={fetchedRichMenu}
              onRefresh={refresh}
            />
          )}
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
}

export default RichMenuNodeModal;