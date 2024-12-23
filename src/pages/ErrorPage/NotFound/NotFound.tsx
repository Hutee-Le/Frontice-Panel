import { Button, Result } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router";

const NotFoundPage: FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status={"404"}
      title="404 NOT FOUND"
      subTitle="Trang bạn tìm kiếm hiện không tồn tại"
      extra={
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/")}
        >
          Quay về trang chủ
        </Button>
      }
    />
  );
};

export default NotFoundPage;
