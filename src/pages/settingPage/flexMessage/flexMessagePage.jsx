import React, { useState, useEffect } from 'react';
import FlexMessageTable from './flexMessageTable';
import { useParams } from 'react-router-dom';

const FlexMessageSettingPage = () => {
  const { channel } = useParams();
  const [flexMessages, setFlexMessages] = useState([]);

  const fetchFlexMessageData = async () => {
    try {
      const res = await fetch(`/api/${channel}/setting/flexMessages/fetchInfo`);
      const data = await res.json();
      const formattedMessages = Array.isArray(data)
        ? data.map(item => ({
            id: item.FlexMessage?.FlexMessageID,
            name: item.FlexMessage?.DataName
          }))
        : [];
      setFlexMessages(formattedMessages);
    } catch (err) {
      console.error('Fetch node info failed:', err);
    }
  };
    
  useEffect(() => {
    fetchFlexMessageData();
  }, [channel]);

  return (
    <div>
      <FlexMessageTable
        flexMessages={flexMessages}
        channel={channel}
        onRefresh={fetchFlexMessageData}
      />
    </div>
  );
};

export default FlexMessageSettingPage;
