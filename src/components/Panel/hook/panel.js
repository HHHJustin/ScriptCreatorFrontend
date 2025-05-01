import { useNavigate, useParams } from 'react-router-dom';

// 在 component 外層寫一個包裝函數
export const handleCreateNodeClick = async (type, x, y, channel, navigate) => {
  try {
    const res = await fetch(`/api/${channel}/create/node`, {
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
