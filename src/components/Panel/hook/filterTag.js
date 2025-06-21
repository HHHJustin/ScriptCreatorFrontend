export const addFilterTag = async (tagName, channelId, onRefreshTags) => {
    try {
      const res = await fetch(`/api/${channelId}/filtertags/tag/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FilterTagName: tagName,
        }),
      });
  
      const data = await res.json(); 
  
      if (res.ok) {
        console.log('新增成功:', data);
        onRefreshTags(); 
      } else {
        console.error('新增失敗:', data);
      }
    } catch (err) {
      console.error('新增失敗:', err);
    }
};
  
export const deleteFilterTag = async (tagName, channelId, onRefreshTags) => {
    try {
      const res = await fetch(`/api/${channelId}/filtertags/tag/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FilterTagName: tagName,
        }),
      });
  
      const data = await res.json(); 
  
      if (res.ok) {
        console.log('刪除成功:', data);
        onRefreshTags(); 
      } else {
        console.error('刪除失敗:', data);
      }
    } catch (err) {
      console.error('刪除失敗:', err);
    }
};

export const updateNodeTagStatus = async (nodeID, isActive, filterTagID, channelId) => {
    try {
        const res = await fetch(`/api/${channelId}/filtertags/status/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentNodeID: nodeID,
                status: isActive,
                filterTagID: filterTagID,
            })
        });
    
    const data = await res.json(); 
  
    if (res.ok) {
        console.log('更新成功:', data);
    } else {
        console.error('更新失敗:', data);
    }
    } catch (err) {
        console.error('更新失敗:', err);
    }
};

