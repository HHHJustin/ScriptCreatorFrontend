const addChannel = async (navigate) => {
    try {
    const res = await fetch(`/api/channels/add`, {
        method: "POST",
        credentials: "include",
        });
  
      if (res.status === 401) {
        // 未登入
        navigate('/');
        return;
      }
  
      if (!res.ok) {
        const error = await res.json();
        console.error("❌ Failed to add channel:", error);
      } else {
        console.log("✅ Channel added successfully");
        // 新增完直接刷新列表
        window.location.reload();
      }
    } catch (err) {
      console.error("❌ Error adding channel:", err);
    }
  };
  
export default addChannel