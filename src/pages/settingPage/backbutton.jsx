// components/common/BackButton.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BackButton as StyledBackButton } from './style'; // 修改為正確路徑

const BackButton = () => {
  const { channel } = useParams();
  const navigate = useNavigate();

  return (
    <StyledBackButton onClick={() => navigate(`/${channel}/home`)}>
      ← 返回主頁
    </StyledBackButton>
  );
};

export default BackButton;
