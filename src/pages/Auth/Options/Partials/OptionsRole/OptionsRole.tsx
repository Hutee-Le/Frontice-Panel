import { FC } from "react";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import styled from "@emotion/styled";

interface IOptionRoleProps {
  nameRole: string;
  redirectTo: string;
}

const primaryColor = "#5250F7";

const OptionRoleElement = styled(Link)`
  padding: 12px 24px;
  border-radius: 6px;
  border: 1px solid ${primaryColor};
  color: ${primaryColor} !important;
  cursor: pointer;
  text-align: center;
  min-width: 146px;
  transition:
    color 0.2s linear,
    background-color 0.2s linear;
  & > .ant-typography {
    color: ${primaryColor};
    font-size: 16px;
  }

  &:hover {
    background-color: ${primaryColor};
    color: white;

    & > .ant-typography {
      color: white;
    }
  }
`;

const OptionRole: FC<IOptionRoleProps> = ({ nameRole, redirectTo }) => {
  return (
    <OptionRoleElement to={redirectTo}>
      <Typography>{nameRole}</Typography>
    </OptionRoleElement>
  );
};

export default OptionRole;
