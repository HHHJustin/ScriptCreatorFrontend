import styled from 'styled-components';

export const SelectBoxMenuWrapper = styled.div`
  position: fixed;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  z-index: 1000;
`;

export const SelectBoxMenuItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;
