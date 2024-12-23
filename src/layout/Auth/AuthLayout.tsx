import { FC } from "react";
import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";

const AuthLayoutWrapper = styled.div`
  min-height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-item: center;
  & > .content {
    flex: 1;
  }
`;

const AuthLayout: FC = () => {
  return (
    <AuthLayoutWrapper className="auth__layout">
      <div className="content">
        <Outlet />
      </div>
    </AuthLayoutWrapper>
  );
};

export default AuthLayout;
