import { Button, Flex, Result, Typography } from "antd";
import { useLocation, useNavigate } from "react-router";
import constantRoutesAuth from "../../../constants/routes/authentication";
import { useEffect } from "react";

const { Text } = Typography;

const ResultRegisterSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRegisterSuccess = location.state?.isRegisterSuccess;
  const emailRegistration = location.state?.emailRegistration;

  useEffect(() => {
    if (!Boolean(isRegisterSuccess) && Boolean(emailRegistration)) {
      return navigate(-1);
    }
  }, [location.state]);

  if (!isRegisterSuccess) return;

  return (
    <Flex justify="center" align="center" style={{ height: "100%" }}>
      <Result
        status={"success"}
        title="Đăng kí tài khoản thành công"
        style={{ maxWidth: "700px" }}
        subTitle={
          <span>
            Bạn đã thực hiện đăng kí tài khoản{" "}
            <Text
              copyable={{ tooltips: ["Sao chép email", "Đã sao chép email"] }}
            >
              {emailRegistration}
            </Text>{" "}
            cho vai trò tuyển dụng thành công, xin đợi admin xác thực và duyệt
            tài khoản
          </span>
        }
        extra={[
          <Button
            type="default"
            onClick={() =>
              navigate(
                `/${constantRoutesAuth.root}/${constantRoutesAuth.tasker.root}/${constantRoutesAuth.tasker.login}`,
              )
            }
          >
            Quay lại
          </Button>,
        ]}
      />
    </Flex>
  );
};
export default ResultRegisterSuccessPage;
