import React, { useState, useEffect } from 'react';
import FlexMessageTable from './flexMessageTable';

const FlexMessageSettingPage = () => {
  const [flexMessages, setFlexMessages] = useState([]);

  useEffect(() => {
    // 模擬獲取數據
    const fetchedMenus = [
      { id: 1, name: '彈性模板1' },
      { id: 2, name: '彈性模板2' },
    ];
    setFlexMessages(fetchedMenus);
  }, []);

  const handleEdit = (id) => {
    console.log(`編輯 ${id}`);
  };

  const handleDelete = (id) => {
    setFlexMessages(flexMessages.filter((message) => message.id !== id));
    console.log(`刪除 ${id}`);
  };

  return (
    <div>
      <FlexMessageTable
        flexMessages={flexMessages}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default FlexMessageSettingPage;
