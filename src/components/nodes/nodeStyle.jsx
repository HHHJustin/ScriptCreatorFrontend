import styled from "styled-components";

export const Panel = styled.div`
    width: 100%;
    background: #ffffff;
    padding: 16px 12px;
    font-size: 10px;
    &:not(:last-child) {
      border-bottom: 1px solid #ddd;
    }

    .type {
      font-weight: bold;
      font-size: 12px;
      color: #444444;
      margin-bottom: 4px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
    }

    .message {
      font-weight: bold;
      font-size: 12px;
      color: #444444;
      margin-bottom: 4px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
    }

    .text {
      font-weight: bold;
      font-size: 12px;
      color: #444444;;
      margin-bottom: 4px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
    }
    .content {
      font-size: 13px;
      color: #666666;
      line-height: 1.5;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
`;

export const Container = styled.div`
  width: 100%;
`;