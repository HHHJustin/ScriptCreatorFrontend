import React, { useState, useEffect } from 'react';
import RichMenuTable from './richMenuTable';
import { useParams } from 'react-router-dom';

const RichMenuSettingPage = () => {
  const { channel } = useParams();
  const [richMenus, setRichMenus] = useState([]);

  const fetchRichMenuData = async () => {
      try {
        const res = await fetch(`/api/${channel}/richMenus/fetchInfo`);
        const data = await res.json();
        const formattedTags = Array.isArray(data)
          ? data.map(item => ({
              id: item.RichMenu?.MenuID,
              name: item.RichMenu?.RichMenuName
            }))
          : [];
        setRichMenus(formattedTags);
      } catch (err) {
        console.error('Fetch node info failed:', err);
      }
    };
    
  useEffect(() => {
    fetchRichMenuData();
  }, [channel]);

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
        channel={channel}
        onRefresh={fetchRichMenuData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default RichMenuSettingPage;
