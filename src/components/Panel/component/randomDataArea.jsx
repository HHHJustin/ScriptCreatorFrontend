import { useState } from "react";
import { useParams } from "react-router-dom";
import { StyledButton, EditableTextArea } from "../modalStyle";
import EditableTable from "./editableTable";

const RandomDataArea = ({ node, onGoNext, message, onRefresh }) => {
  const { channel } = useParams();
  const currentIDInt = parseInt(node.id, 10);
  const [editing, setEditing] = useState({ index: null, field: null, value: "" });

  const allData = Array.isArray(message)
    ? message
        .filter((item) => typeof item.Index === "number")
        .map(({ Index, Random }) => ({
          id: Index,
          randomID: Random?.RandomID,
          weight: Random?.Weight,
          condition: Random?.Condition || "-",
        }))
    : [];

  // 建立
  const handleCreate = async () => {
    const res = await fetch(`/api/${channel}/randoms/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentNodeID: currentIDInt }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("建立失敗");
  };

  // 更新
  const handleUpdate = async (row, field) => {
    setEditing({ index: null, field: null, value: "" });
    const res = await fetch(`/api/${channel}/randoms/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        randomID: row.randomID,
        field: field,
        value: editing.value,
      }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("更新失敗");
  };

  // 刪除
  const handleDelete = async (row) => {
    if (!window.confirm("確定要刪除這筆訊息嗎？")) return;
    const res = await fetch(`/api/${channel}/randoms/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        randomID: row.randomID,
        currentNodeID: currentIDInt,
      }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("刪除失敗");
  };

  const columns = [
    { key: "id", label: "編號", align: "center", width: "10%" },
    {
      key: "condition",
      label: "情形",
      align: "center",
      width: "30%",
      render: (row) =>
        editing.index === row.id && editing.field === "condition" ? (
          <EditableTextArea
            value={editing.value}
            onChange={(e) => setEditing({ ...editing, value: e.target.value })}
            onBlur={() => handleUpdate(row, "condition")}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              !e.shiftKey &&
              (e.preventDefault(), handleUpdate(row, "condition"))
            }
          />
        ) : (
          <span
            onClick={() =>
              setEditing({ index: row.id, field: "condition", value: row.condition })
            }
          >
            {row.condition}
          </span>
        ),
    },
    {
      key: "weight",
      label: "權重",
      align: "center",
      width: "20%",
      render: (row) =>
        editing.index === row.id && editing.field === "weight" ? (
          <EditableTextArea
            value={editing.value}
            onChange={(e) => setEditing({ ...editing, value: e.target.value })}
            onBlur={() => handleUpdate(row, "weight")}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              !e.shiftKey &&
              (e.preventDefault(), handleUpdate(row, "weight"))
            }
          />
        ) : (
          <span
            onClick={() =>
              setEditing({ index: row.id, field: "weight", value: row.weight })
            }
          >
            {row.weight}
          </span>
        ),
    },
    {
      key: "action",
      label: "動作",
      align: "center",
      width: "20%",
      render: (row) => <StyledButton onClick={() => handleDelete(row)}>刪除</StyledButton>,
    },
    {
      key: "extra",
      label: "前往",
      align: "center",
      width: "15%",
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

export default RandomDataArea;
