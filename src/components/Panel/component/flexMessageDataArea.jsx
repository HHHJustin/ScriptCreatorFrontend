// components/FlexMessageDataArea.jsx
import { useParams } from "react-router-dom";
import EditableTable from "./editableTable";
import { StyledSelect, StyledButton } from "../modalStyle";

const FlexMessageDataArea = ({ node, message, flexMessages, onRefresh }) => {
  const { channel } = useParams();
  const currentIDInt = parseInt(node.id, 10);

  const allData = Array.isArray(message)
    ? message
        .filter(item => typeof item.Index === "number")
        .map(({ Index, FlexMessageChoice }) => ({
          id: Index,
          flexMessageID: FlexMessageChoice?.FlexMessageID || "",
          flexMessageChoiceID: FlexMessageChoice?.FlexMessageChoiceID,
        }))
    : [];

  const handleCreate = async () => {
    const res = await fetch(`/api/${channel}/flexMessages/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentNodeID: currentIDInt }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("建立失敗");
  };

  const handleDelete = async (row) => {
    if (!window.confirm("確定要刪除這筆訊息嗎？")) return;
    const res = await fetch(`/api/${channel}/flexMessages/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        flexMessageChoiceID: row.flexMessageChoiceID,
        currentNodeID: currentIDInt,
      }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("刪除失敗");
  };

  const handleUpdate = async (row, field, value) => {
    const res = await fetch(`/api/${channel}/flexMessages/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        flexMessageID: parseInt(value),
        flexMessageChoiceID: row.flexMessageChoiceID,
      }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("更新失敗");
  };

  const columns = [
    { key: "id", label: "編號", align: "center", width: "20%" },
    {
      key: "flexMessageID",
      label: "訊息",
      align: "center",
      width: "60%",
      render: (row) => (
        <StyledSelect
          value={row.flexMessageID}
          onChange={(e) => handleUpdate(row, "flexMessageID", e.target.value)}
        >
          <option value="">請選擇</option>
          {flexMessages.map((flex) => (
            <option key={flex.id} value={flex.id}>
              {flex.name}
            </option>
          ))}
        </StyledSelect>
      ),
    },
    {
      key: "action",
      label: "動作",
      align: "center",
      width: "20%",
      render: (row) => <StyledButton onClick={() => handleDelete(row)}>刪除</StyledButton>,
    },
  ];

  return (
    <EditableTable
      columns={columns}
      data={allData}
      onCreate={handleCreate}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      addButtonText="建立"
    />
  );
};

export default FlexMessageDataArea;
