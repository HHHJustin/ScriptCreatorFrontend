import React, { useState, useEffect } from 'react';
import TagTable from './tagSettingTable';
import { useParams } from 'react-router-dom';

const TagSettingPage = () => {
    const { channel } = useParams();
    const [tags, setTags] = useState([]);

    const fetchTagData = async () => {
        try {
          const res = await fetch(`/api/${channel}/setting/tagNodes/fetchInfo`);
          const data = await res.json();
          const formattedTags = Array.isArray(data)
            ? data.map(item => ({
                id: item.Tag?.TagID,
                name: item.Tag?.TagName
              }))
            : [];
          setTags(formattedTags);
        } catch (err) {
          console.error('Fetch node info failed:', err);
        }
      };
    
      useEffect(() => {
        fetchTagData();
      }, [channel]);

    return (
        <div style={{ padding: '10px' }}>
        <TagTable
            tags={tags}
            channel={channel}
            onRefresh={fetchTagData}
        />
        </div>
    );
};

export default TagSettingPage;
