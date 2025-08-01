import EditableTable from "./editableTable";
import { StyledSelect, StyledButton } from "../modalStyle";
import { useParams } from "react-router-dom";

const TagOperationDataArea = ({ node, messages, tags, onRefresh }) => {
  const { channel } = useParams();
  const currentIDInt = parseInt(node.id, 10);
  const allData = Array.isArray(messages)
    ? messages
        .filter(item => typeof item.Index === "number")
        .map(({ Index, TagOperation }) => ({
          id: Index,
          tagName: TagOperation?.TagName || "",
          operationType: TagOperation?.OperationType || "",
          tagOperationID: TagOperation.TagOperationID,
        }))
    : [];

  const handleCreate = async () => {
    const res = await fetch(`/api/${channel}/tagOperations/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentNodeID: currentIDInt }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("建立失敗");
  };

  const handleDelete = async (row) => {
    if (!window.confirm("確定要刪除嗎？")) return;
    const res = await fetch(`/api/${channel}/tagOperations/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tagOperationID: row.tagOperationID, currentNodeID: currentIDInt }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("刪除失敗");
  };

  const handleUpdate = async (row, field, value) => {
    const res = await fetch(`/api/${channel}/tagOperations/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tagOperationID: row.tagOperationID, field, value }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("更新失敗");
  };

  const columns = [
    { key: "id", label: "編號", align: "center", width: "20%" },
    {
      key: "operation",
      label: "動作",
      align: "center",
      width: "20%",
      render: (row) => (
        <StyledSelect
          value={row.operationType}
          onChange={(e) => handleUpdate(row, "OperationType", e.target.value)}
        >
          <option value="">請選擇</option>
          <option value="Add">新增</option>
          <option value="Remove">刪除</option>
        </StyledSelect>
      ),
    },
    {
      key: "tag",
      label: "標籤",
      align: "center",
      width: "40%",
      render: (row) => (
        <StyledSelect
          value={row.tagName}
          onChange={(e) => handleUpdate(row, "TagName", e.target.value)}
        >
          <option value="">請選擇標籤</option>
          {tags.map(tag => (
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          ))}
        </StyledSelect>
      ),
    },
    {
      key: "action",
      label: "操作",
      align: "center",
      width: "20%",
      render: (row) => <StyledButton onClick={() => handleDelete(row)}>刪除</StyledButton>,
    },
  ];

  return <EditableTable columns={columns} data={allData} onCreate={handleCreate} />;
};

export default TagOperationDataArea;
