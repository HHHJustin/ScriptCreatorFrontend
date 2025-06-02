import {
  DataAreaWrapper, Th, Tr, Td, BranchGoNextNode, Table,
  CenteredTd, StyledButton
} from "../modalStyle";
import { useParams } from "react-router-dom";
import React, { useState } from "react";

const columns = [
  { key: 'id', label: '編號', align: 'center', width: '20%' },
  { key: 'tags', label: '標籤', align: 'center', width: '40%' },
  { key: 'action', label: '動作', align: 'center', width: '25%' },
  { key: 'extra', label: '前往', align: 'center', width: '15%' },
];

const TagDecisionDataArea = ({ node, messages, tags, onRefresh }) => {
  const { channel } = useParams();
  const currentIDInt = parseInt(node.id, 10);
  const [editTagsId, setEditTagsId] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  if (!messages) {
    return <div style={{ padding: '1rem' }}>Loading tag decision data...</div>;
  }

  const tagDecisionList = messages.TagDecisions || [];

  const allData = Array.isArray(tagDecisionList)
    ? tagDecisionList
        .filter(item => typeof item?.Index === 'number' && item?.TagDecision)
        .map(({ Index, TagDecision }) => {
          const tagIdList = Array.isArray(TagDecision.Tags) ? TagDecision.Tags : [];
          const matchedTagNames = tags
            .filter(tag => tagIdList.includes(tag.id))
            .map(tag => tag.name);

          return {
            id: Index,
            name: TagDecision.Name || '—',
            tags: matchedTagNames.length > 0 ? matchedTagNames.join(', ') : '—',
            tagList: matchedTagNames, // 這裡是 tag.name 陣列
            tagDecisionID: TagDecision.TagDecisionID,
          };
        })
    : [];

  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/${channel}/tagDecisions/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentNodeID: currentIDInt })
      });
      if (res.ok) onRefresh && onRefresh();
      else alert('建立失敗');
    } catch (err) {
      console.error('❌ 建立錯誤:', err);
      alert('建立失敗');
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm('確定要刪除這筆標籤決策嗎？')) return;
    try {
      const res = await fetch(`/api/${channel}/tagDecisions/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tagDecisionID: item.tagDecisionID,
          currentNodeID: currentIDInt,
        })
      });
      if (res.ok) onRefresh && onRefresh();
      else alert('刪除失敗');
    } catch (err) {
      console.error('❌ 刪除錯誤:', err);
      alert('刪除失敗');
    }
  };

  const handleSaveTags = async (item) => {
    try {
      const tagIDs = tags
        .filter(tag => selectedTags.includes(tag.name))
        .map(tag => tag.id);

      const res = await fetch(`/api/${channel}/tagDecisions/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tagDecisionID: item.tagDecisionID,
          tags: tagIDs
        })
      });

      if (res.ok) {
        onRefresh && onRefresh();
        setEditTagsId(null);
      } else {
        alert('儲存失敗');
      }
    } catch (err) {
      console.error('❌ 儲存錯誤:', err);
      alert('儲存失敗');
    }
  };

  return (
    <DataAreaWrapper>
      <Table>
        <thead>
          <tr>
            {columns.map((col) => (
              <Th key={col.key} style={{ textAlign: col.align, width: col.width }}>
                {col.label}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allData.map((item) => (
            <React.Fragment key={item.id}>
              <Tr>
                <Td style={{ textAlign: 'center' }}>{item.id}</Td>
                <Td
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                  onClick={() => {
                    setEditTagsId(item.id);
                    setSelectedTags(Array.isArray(item.tagList) ? [...item.tagList] : []);
                  }}
                >
                  {item.tags}
                </Td>
                <Td style={{ textAlign: 'center' }}>
                  <StyledButton onClick={() => handleDelete(item)}>刪除</StyledButton>
                </Td>
                <Td style={{ textAlign: 'center' }}>
                  <StyledButton onClick={() => console.log('前往 ID:', item.id)}>▶︎</StyledButton>
                </Td>
              </Tr>

              {editTagsId === item.id && (
                <Tr key={`edit-${item.id}`}>
                  <Td colSpan={4} style={{ textAlign: 'center' }}>
                    {tags.map(tag => {
                      const isActive = selectedTags.includes(tag.name);
                      return (
                        <StyledButton
                          key={`tag-${tag.id}`}
                          style={{
                            margin: '4px',
                            backgroundColor: isActive ? 'green' : 'lightgray',
                            color: isActive ? 'white' : 'black'
                          }}
                          onClick={() => {
                            setSelectedTags(prev =>
                              prev.includes(tag.name)
                                ? prev.filter(t => t !== tag.name)
                                : [...prev, tag.name]
                            );
                          }}
                        >
                          {tag.name}
                        </StyledButton>
                      );
                    })}
                    <div style={{ marginTop: '10px' }}>
                      <StyledButton onClick={() => handleSaveTags(item)}>儲存</StyledButton>
                      <StyledButton style={{ marginLeft: '8px' }} onClick={() => setEditTagsId(null)}>取消</StyledButton>
                    </div>
                  </Td>
                </Tr>
              )}
            </React.Fragment>
          ))}
          <Tr>
            <CenteredTd>New</CenteredTd>
            <CenteredTd />
            <CenteredTd>
              <StyledButton onClick={handleSubmit}>建立</StyledButton>
            </CenteredTd>
            <CenteredTd />
          </Tr>
        </tbody>
      </Table>
    </DataAreaWrapper>
  );
};

export default TagDecisionDataArea;
