import React, { useState, useEffect } from 'react';
import RichMenuTable from './richMenuTable';

const RichMenuSettingPage = () => {
  const [richMenus, setRichMenus] = useState([]);

  useEffect(() => {
    // 模擬獲取數據
    const fetchedMenus = [
      { id: 1, name: '圖文選單1' },
      { id: 2, name: '圖文選單2' },
    ];
    setRichMenus(fetchedMenus);
  }, []);

  const handleEdit = (id) => {
    console.log(`編輯選單 ${id}`);
  };

  const handleDelete = (id) => {
    setRichMenus(richMenus.filter((menu) => menu.id !== id));
    console.log(`刪除選單 ${id}`);
  };

  return (
    <div>
      <RichMenuTable
        richMenus={richMenus}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default RichMenuSettingPage;
