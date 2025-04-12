import { React, useState } from 'react';
import { DataAreaWrapper, Table, Th, Td, Tr, ModalOverlay, ModalContent, 
TopWrapper, GoPreviousNode, BranchGoNextNode, NodeTitle, ContentWrapper, TagArea, AddTagInput, Tag } from './modalStyle';

const DataArea = ({ node, onGoNext }) => {
  const allData = node.data.content;

  if (!allData || !Array.isArray(allData)) {
    return <div>沒有資料</div>;
  }

  const columns = [
    { key: 'id', label: '編號', align: 'center', width: '20%' },
    { key: 'tags', label: '標籤', align: 'center', width: '80%' },
  ];

  return (
    <DataAreaWrapper>
      <Table>
        <thead>
          <tr>
            {columns.map((col) => (
              <Th key={col.key}>
                {col.label}
              </Th>
            ))}
            <Th></Th> 
          </tr>
        </thead>
        <tbody>
          {allData.map((item) => (
            <Tr key={item.id}>
              {columns.map((col) => (
                <Td
                  key={col.key}
                  style={{
                    textAlign: col.align,
                    width: col.width,
                    whiteSpace: col.key === 'content' ? 'normal' : 'nowrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {item[col.key]}
                </Td>
              ))}
              <Td style={{ textAlign: 'center' }}>
                <BranchGoNextNode onClick={() => onGoNext(item.id)}>▶︎</BranchGoNextNode>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </DataAreaWrapper>
  );
};

function TagDecisionNodeModal({ node, tags, onClose }) {
  const [newTag, setNewTag] = useState('');

  const handleAddTag = (tagText) => {
    console.log('新增標籤：', tagText);
  };
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
          <DataArea node={node} 
          onGoNext={(id) => { console.log('你點到了 id:', id); }}/>
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
}

export default TagDecisionNodeModal;