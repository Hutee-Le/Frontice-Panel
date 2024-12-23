import styled from "@emotion/styled";
import { Spin } from "antd";

const LoadingAuthentication = () => {
  const Loading = styled.div`
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  return (
    <Loading>
      <Spin size="large" tip="Đang thực hiện xác thực người dùng"></Spin>
    </Loading>
  );
};

export default LoadingAuthentication;
