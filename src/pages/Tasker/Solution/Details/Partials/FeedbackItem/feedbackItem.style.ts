import styled from "@emotion/styled";
import { Avatar, List } from "antd";

const ListItem = styled(List.Item)<{ align: "left" | "right" }>`
  display: flex;
  align-items: center;
  justify-content: ${({ align }) =>
    align === "left" ? "flex-start" : "flex-end"};
  overflow: hidden;
  text-wrap: wrap;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  gap: 16px;
  flex-direction: ${({ align }: { align: "left" | "right" }) =>
    align === "left" ? "row" : "row-reverse"};
`;

const StyledAvatar = styled(Avatar)`
  flex-shrink: 0;
`;

const StyledMetaWrapper = styled.div<{ align: "left" | "right" }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => (align === "left" ? "flex-start" : "flex-end")};
  width: 100%;

  .ant-list-item-meta-title {
    margin-bottom: 8px;
  }

  .ant-list-item-meta-description {
    text-align: ${({ align }) => (align === "left" ? "left" : "right")};
  }

  .ant-list-item-meta-time {
    margin-top: 4px;
    font-size: 12px;
    color: #888;
    text-align: ${({ align }) => (align === "left" ? "left" : "right")};
  }
`;

export { ListItem, StyledAvatar, StyledMetaWrapper, ContentWrapper };
