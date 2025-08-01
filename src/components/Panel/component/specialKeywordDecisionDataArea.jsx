import { StyledButton, StyledSelect, EditableTextArea } from "../modalStyle";
import { useParams } from "react-router-dom";
import EditableTable from "./editableTable";

const SpecialKeywordDecisionDataArea = ({ node, onGoNext, message, onRefresh }) => {
  const { channel } = useParams();
  const currentIDInt = parseInt(node.id, 10);

  const allData = Array.isArray(message)
    ? message
        .filter(item => typeof item.Index === "number")
        .map(({ Index, SpecialKeyword }) => ({
          id: Index,
          type: SpecialKeyword?.Type || "",
          keyword: SpecialKeyword?.Keyword || "—",
          specialKeywordID: SpecialKeyword?.SpecialKeywordID,
        }))
    : [];

  const handleCreate = async () => {
    const res = await fetch(`/api/${channel}/specialKeywordDecisions/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentNodeID: currentIDInt }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("建立失敗");
  };

  const handleDelete = async (row) => {
    if (!window.confirm("確定要刪除這筆訊息嗎？")) return;
    const res = await fetch(`/api/${channel}/specialKeywordDecisions/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        specialKeywordID: row.specialKeywordID,
        currentNodeID: currentIDInt,
      }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("刪除失敗");
  };

  const handleUpdate = async (row, field, value) => {
    const res = await fetch(`/api/${channel}/specialKeywordDecisions/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        specialKeywordID: row.specialKeywordID,
        field,
        value,
      }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("更新失敗");
  };

  const columns = [
    { key: "id", label: "編號", align: "center", width: "20%" },
    {
      key: "type",
      label: "種類",
      align: "center",
      width: "20%",
      render: (row) => (
        <StyledSelect
          value={row.type}
          onChange={(e) => handleUpdate(row, "type", e.target.value)}
        >
          <option value="">請選擇操作</option>
          <option value="user">單一玩家</option>
          <option value="group">群組</option>
        </StyledSelect>
      ),
    },
    {
      key: "keyword",
      label: "關鍵字",
      align: "center",
      width: "30%",
      render: (row) => (
        <EditableTextArea
          value={row.keyword}
          onChange={(e) => handleUpdate(row, "keyword", e.target.value)}
        />
      ),
    },
    {
      key: "action",
      label: "動作",
      align: "center",
      width: "20%",
      render: (row) => (
        <StyledButton onClick={() => handleDelete(row)}>刪除</StyledButton>
      ),
    },
    {
      key: "extra",
      label: "前往",
      align: "center",
      width: "10%",
      render: (row) => (
        <StyledButton onClick={() => onGoNext(row.id)}>▶︎</StyledButton>
      ),
    },
  ];

  return (
    <EditableTable
      columns={columns}
      data={allData}
      onCreate={handleCreate}
      createText="建立"
    />
  );
};

export default SpecialKeywordDecisionDataArea;
