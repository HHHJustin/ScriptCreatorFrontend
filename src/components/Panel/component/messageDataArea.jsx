// components/MessageDataArea.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import EditableTable from "./editableTable";

const MessageDataArea = ({ node, message, onRefresh }) => {
  const { channel } = useParams();
  const currentIDInt = parseInt(node.id, 10);

  const allData = Array.isArray(message)
    ? message.map((item) => ({
        id: item.index,
        rawType: item.type,
        type: typeToChinese(item.type),
        messageID: item.messageId,
        content:
          item.type === "text"
            ? item.text?.trim() || "—"
            : item.type === "image" || item.type === "video"
            ? `${item.fileName || ""};${item.fileURL || ""}`
            : "—",
      }))
    : [];

  const handleCreate = async () => {
    const res = await fetch(`/api/${channel}/messages/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentNodeID: currentIDInt, messageType: "text" }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("建立失敗");
  };

  const handleDelete = async (row) => {
    const res = await fetch(`/api/${channel}/messages/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messageID: row.messageID,
        currentNodeID: currentIDInt,
        messageType: row.rawType,
        messageContent: JSON.stringify({ fileURL: row.content.split(";")[1] }),
      }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("刪除失敗");
  };

  const handleUpdate = async (row, field, value) => {
    const res = await fetch(`/api/${channel}/messages/update/text`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messageID: row.messageID,
        currentNodeID: currentIDInt,
        messageType: row.rawType,
        messageContent: value,
      }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("更新失敗");
  };

  const handleReorder = async (fromIndex, toIndex) => {
    const res = await fetch(`/api/${channel}/node/update-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentNodeID: currentIDInt,
        draggedMessageIndex: fromIndex,
        newIndex: toIndex,
      }),
    });
    if (res.ok) onRefresh && onRefresh();
    else alert("排序失敗");
  };

  const columns = [
    { key: "id", label: "編號", align: "center", width: "10%" },
    { key: "type", label: "種類", align: "center", width: "20%" },
    { key: "content", label: "內容", editable: true, align: "center", width: "50%" },
    {
      key: "action",
      label: "動作",
      align: "center",
      width: "20%",
      render: (row) => <button onClick={() => handleDelete(row)}>刪除</button>,
    },
  ];

  return (
    <EditableTable
      columns={columns}
      data={allData}
      onCreate={handleCreate}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      onReorder={handleReorder}
      addButtonText="新增訊息"
    />
  );
};

const typeToChinese = (type) => {
  switch (type?.toLowerCase()) {
    case "text":
      return "文字";
    case "image":
      return "圖片";
    case "video":
      return "影片";
    default:
      return "未知";
  }
};

export default MessageDataArea;
