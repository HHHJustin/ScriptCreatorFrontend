import { TagArea, AddTagInput, Tag } from "../modalStyle";
import { useState, useEffect, useCallback } from "react";
import { addFilterTag, deleteFilterTag, updateNodeTagStatus } from "../hook/filterTag";

const FilterTagEditor = ({ tags, node, channel, onRefreshTags }) => {
  const [newTag, setNewTag] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [nodeTags, setNodeTags] = useState([]);
  const currentIDInt = parseInt(node.id, 10);

  const fetchNodeFilterTag = useCallback(async () => {
    if (!channel) return;
    try {
      const res = await fetch(`/api/${channel}/${node.id}/filtertag`);
      const data = await res.json();
      setNodeTags(data.FilterTags);    
    } catch (err) {
      console.error("Fetch node filter tag error:", err);
    }
  }, [channel, node.id]);

  useEffect(() => {
    fetchNodeFilterTag(); // 載入時執行一次
  }, [fetchNodeFilterTag]);

  return (
    <TagArea>
      <AddTagInput
        type="text"
        placeholder="新增標籤..."
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onKeyUp={(e) => {
          if (e.key === 'Enter' && !isComposing && newTag.trim() !== '') {
            addFilterTag(newTag.trim(), channel, async () => {
              await fetchNodeFilterTag(); // 新增後更新顯示
              onRefreshTags?.();
            });
            setNewTag('');
          }
        }}
      />
      {tags.map((tag) => {
        const isActive = nodeTags.includes(tag.id); // tag.id 是數字

        const handleRightClick = (e) => {
          e.preventDefault();
          if (window.confirm(`確定要刪除標籤 "${tag.tag}" 嗎？`)) {
            deleteFilterTag(tag.tag, channel, async () => {
              await fetchNodeFilterTag(); // 刪除後更新顯示
              onRefreshTags?.();
            });
          }
        };

        return (
          <Tag
            key={tag.id}
            $active={isActive}
            onContextMenu={handleRightClick}
            onClick={async () => {
              await updateNodeTagStatus(currentIDInt, isActive, tag.id, channel);
              await fetchNodeFilterTag(); // 點擊切換狀態後更新顯示
            }}
          >
            {tag.tag}
          </Tag>
        );
      })}
    </TagArea>
  );
};

export default FilterTagEditor;
