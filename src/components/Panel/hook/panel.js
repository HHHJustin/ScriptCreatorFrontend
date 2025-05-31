export const handleCreateNodeClick = async (type, x, y, channel, navigate) => {
  try {
    const res = await fetch(`/api/${channel}/node/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newNodeType: type,
        locX: x,
        locY: y,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error('❌ Failed to create node:', error);
    } else {
      console.log('✅ Node created successfully');
      navigate(0); // 強制刷新當前頁面
    }
  } catch (err) {
    console.error('❌ Error in node creation:', err);
  }
};

export const handleTitleChange = async (node, newTitle, setNodes, channel) => {
  if (!node) return;
  try {
    const currentIDInt = parseInt(node.id, 10);
    const res = await fetch(`/api/${channel}/node/title/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentNodeID: currentIDInt,  
        newTitle: newTitle,  
      }),
    });

    if (res.ok) {
      const data = await res.json();

      const fetchUpdatedNode = await fetch(`/api/${channel}/${node.id}/title`);
      if (fetchUpdatedNode.ok) {
        
        setNodes((prevNodes) =>
          prevNodes.map((node) =>
            node.id === fetchUpdatedNode.id
              ? { ...node, data: { ...node.data, title: fetchUpdatedNode.data.title } }
              : node
          )
        );
      } else {
        console.error('無法獲取更新後的節點資料');
      }
    } else {
      console.error('標題更新失敗');
    }
  } catch (err) {
    console.error('Fetch node info failed:', err);
  }
};