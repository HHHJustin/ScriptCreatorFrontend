import React, { useState, useEffect } from 'react';
import UploadImageTable from './uploadImageTable';
import { useParams } from 'react-router-dom';
import BackButton from '../backbutton';

const UploadImageSettingPage = () => {
  const { channel } = useParams();
  const [ uploadImage, setUploadImage] = useState([]);

  const fetchUploadImageData = async () => {
    try {
      const res = await fetch(`/api/${channel}/setting/uploadImages/fetchInfo`);
      const data = await res.json();
      const formattedImageData = Array.isArray(data)
        ? data.map(item => ({
            id: item.FlexMessageImage?.FlexMessageImageID,
            name: item.FlexMessageImage?.ImageName,
            link: item.FlexMessageImage?.ImageLink
          }))
        : [];
      setUploadImage(formattedImageData);
    } catch (err) {
      console.error('Fetch node info failed:', err);
    }
  };
    
  useEffect(() => {
    fetchUploadImageData();
  }, [channel]);

  return (
    <div>
      <UploadImageTable
        images={uploadImage}
        channel={channel}
        onRefresh={fetchUploadImageData}
       />
       <BackButton />
    </div>
  );
};

export default UploadImageSettingPage;
