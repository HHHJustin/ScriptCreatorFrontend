import React, { useState, useEffect } from 'react';
import RichMenuTable from './richMenuTable';
import { useParams } from 'react-router-dom';
import BackButton from '../backbutton';

const RichMenuSettingPage = () => {
  const { channel } = useParams();
  const [richMenus, setRichMenus] = useState([]);

  const fetchRichMenuData = async () => {
    try {
      const res = await fetch(`/api/${channel}/setting/richMenus/fetchInfo`);
      const data = await res.json();
      const formattedMenus = Array.isArray(data)
        ? data.map(item => ({
            id: item.RichMenu?.MenuID,
            name: item.RichMenu?.RichMenuName
          }))
        : [];
      setRichMenus(formattedMenus);
    } catch (err) {
      console.error('Fetch node info failed:', err);
    }
  };
    
  useEffect(() => {
    fetchRichMenuData();
  }, [channel]);

  return (
    <div>
      <RichMenuTable
        richMenus={richMenus}
        channel={channel}
        onRefresh={fetchRichMenuData}
      />
      <BackButton />
    </div>
  );
};

export default RichMenuSettingPage;
