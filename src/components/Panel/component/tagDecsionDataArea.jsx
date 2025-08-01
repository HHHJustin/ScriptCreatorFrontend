import EditableTable from "./editableTable";
import { StyledButton } from "../modalStyle";
import { useParams } from "react-router-dom";
import { useState } from "react";
import TagSelectorModal from "./TagSelectorModal";

const TagDecisionDataArea = ({ node, messages, tags, onRefresh }) => {
  const { channel } = useParams();
  const currentIDInt = parseInt(node.id, 10);
  const [editingItem, setEditingItem] = useState(null); // 控制 modal 開關

  const allData = Array.isArray(messages?.TagDecisions)
    ? messages.TagDecisions
        .filter(item => typeof item?.Index === "number" && item?.TagDecision)
        .map(({ Index, TagDecision }) => {
          const tagIdList = Array.isArray(TagDecision.Tags) ? TagDecision.Tags : [];
          const matchedTags = tags.filter(tag => tagIdList.includes(tag.id));
          return {
            id: Index,
            tagDecisionID: TagDecision.TagDecisionID,
            tags: matchedTags.map(tag => tag.name).join(", "),
            tagList: matchedTags.map(tag => tag.id),
          };
        })
    : [];

  const handleCreate = async () => {
    const res = await fetch(`/api/${channel}/tagDecisions/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentNodeID: currentIDInt }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("建立失敗");
  };

  const handleDelete = async (row) => {
    if (!window.confirm("確定要刪除這筆標籤決策嗎？")) return;
    const res = await fetch(`/api/${channel}/tagDecisions/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tagDecisionID: row.tagDecisionID, currentNodeID: currentIDInt }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("刪除失敗");
  };

  const handleUpdateTags = async (row, tagIds) => {
    const res = await fetch(`/api/${channel}/tagDecisions/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tagDecisionID: row.tagDecisionID, tags: tagIds }),
    });
    if (res.ok) {
      setEditingItem(null);
      onRefresh && onRefresh();
    } else alert("更新失敗");
  };

  const columns = [
    { key: "id", label: "編號", align: "center", width: "20%" },
    { 
      key: "tags", 
      label: "標籤", 
      align: "center", 
      width: "40%", 
      render: (row) => (
        <span style={{ cursor: "pointer" }} onClick={() => setEditingItem(row)}>
          {row.tags || "—"}
        </span>
      ),
    },
    {
      key: "action",
      label: "動作",
      align: "center",
      width: "25%",
      render: (row) => (
        <StyledButton onClick={() => handleDelete(row)}>刪除</StyledButton>
      ),
    },
    {
      key: "extra",
      label: "前往",
      align: "center",
      width: "15%",
      render: (row) => (
        <StyledButton onClick={() => console.log("前往", row.id)}>▶︎</StyledButton>
      ),
    },
  ];

  return (
    <>
      <EditableTable
        columns={columns}
        data={allData}
        onCreate={handleCreate}
        createText="建立"
      />

      {editingItem && (
        <TagSelectorModal
          tags={tags}
          selected={editingItem.tagList}
          onClose={() => setEditingItem(null)}
          onSave={(newTags) => handleUpdateTags(editingItem, newTags)}
        />
      )}
    </>
  );
};

export default TagDecisionDataArea;
