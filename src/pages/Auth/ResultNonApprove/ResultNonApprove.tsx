import { Button, Result, Typography } from "antd";
import { useNavigate } from "react-router";
import constantRoutesAuth from "../../../constants/routes/authentication";

const { Text } = Typography;
const ResultNonApprovePage = () => {
  const navigate = useNavigate();
  return (
    <Result
      status={"403"}
      title="Tài khoản chưa được duyệt"
      subTitle={
        <Text>
          Tài khoản của bạn đã đăng kí thành công nhưng chưa được duyệt bởi
          admin. Bạn có thể liên hệ qua email:{" "}
          <Text
            style={{ color: "blue", textDecoration: "underline" }}
            copyable={{ tooltips: ["Sao chép email", "Đã sao chép email"] }}
          >
            frontice.suport@frontice.com
          </Text>
        </Text>
      }
      extra={[
        <Button
          type="primary"
          variant="solid"
          color="primary"
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
  );
};

export default ResultNonApprovePage;
