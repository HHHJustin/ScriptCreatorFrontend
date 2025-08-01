import { useParams } from "react-router-dom";
import { StyledButton, StyledSelect } from "../modalStyle";
import EditableTable from "./editableTable";

const RichMenuDataArea = ({ node, messages, richMenus, onRefresh }) => {
  const { channel } = useParams();
  const currentIDInt = parseInt(node.id, 10);

  const allData = Array.isArray(messages)
    ? messages
        .filter(item => typeof item.Index === "number")
        .map(({ Index, RichMenuChoice }) => ({
          id: Index,
          richMenuChoiceID: RichMenuChoice?.RichMenuChoiceID || "—",
          richMenuID: RichMenuChoice.RichMenuID,
        }))
    : [];

  const handleCreate = async () => {
    const res = await fetch(`/api/${channel}/richMenus/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentNodeID: currentIDInt }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("建立失敗");
  };

  const handleDelete = async (row) => {
    if (!window.confirm("確定要刪除這筆訊息嗎？")) return;
    const res = await fetch(`/api/${channel}/richMenus/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        richMenuChoiceID: row.richMenuChoiceID,
        currentNodeID: currentIDInt,
      }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("刪除失敗");
  };

  const handleUpdate = async (row, richMenuID) => {
    const res = await fetch(`/api/${channel}/richMenus/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        richMenuChoiceID: row.richMenuChoiceID,
        richMenuID,
      }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("更新失敗");
  };

  const columns = [
    { key: "id", label: "編號", align: "center", width: "20%" },
    {
      key: "menu",
      label: "圖文選單",
      align: "center",
      width: "60%",
      render: (row) => (
        <StyledSelect
          value={row.richMenuID}
          onChange={(e) => handleUpdate(row, parseInt(e.target.value))}
        >
          <option value="">請選擇</option>
          {richMenus.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.name}
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
      render: (row) => (
        <StyledButton onClick={() => handleDelete(row)}>刪除</StyledButton>
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

export default RichMenuDataArea;
