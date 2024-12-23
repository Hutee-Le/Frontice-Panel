import { Button, Flex, Form, FormProps, Input, Typography } from "antd";
import { ISendOTPRequest } from "../../../types/request/auth";
import { useMutation } from "@tanstack/react-query";
import mutationKey from "../../../constants/mutation";
import authService from "../../../service/authService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import constantRoutesAuth from "../../../constants/routes/authentication";
import styled from "@emotion/styled";

const { Title } = Typography;

const EmailRegistrationFormWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: "center";
  align-items: center;
`;

const EmailRegistrationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mutationSendOTP = useMutation({
    mutationKey: [mutationKey.sendOTP],
    mutationFn: async (data: ISendOTPRequest) =>
      await authService.sendOTP(data),
  });
  const onFinishForm: FormProps<ISendOTPRequest>["onFinish"] = async (
    formValue,
  ) => {
    return await toast.promise(
      mutationSendOTP.mutateAsync(formValue).then(() => {
        const newPath = location.pathname.replace(
          constantRoutesAuth.tasker.emailRegistration,
          constantRoutesAuth.tasker.verifyOtp,
        );

        navigate(newPath, {
          state: {
            emailVerify: formValue.email,
          },
        });
      }),
      {
        pending: "Đang thực hiện xác nhận email",
        success: "Đã gửi mã OTP xác nhận qua email",
        error: "Xác nhận Email thất bại",
      },
    );
  };

  return (
    <EmailRegistrationFormWrapper>
      <Flex flex={1} vertical gap={32} justify="center" align="center">
        <Title>Đăng kí Email</Title>
        <Form
          onFinish={onFinishForm}
          layout="vertical"
          style={{ maxWidth: "300px", width: "100%" }}
        >
          <Form.Item<ISendOTPRequest>
            label="Email bạn đăng kí"
            name={"email"}
            rules={[
              { required: true, message: "Email không được để trống" },
              {
                type: "email",
                message: "Email không hợp lệ",
              },
            ]}
          >
            <Input type="email" placeholder="Nhập email bạn muốn đăng kí" />
          </Form.Item>
          <Form.Item>
            <Button
              variant="solid"
              color="primary"
              block
              loading={mutationSendOTP.isPending}
              htmlType="submit"
            >
              Đăng kí
            </Button>
          </Form.Item>

          <Form.Item>
            <Flex align="center" justify="center">
              <Button
                variant="link"
                color="default"
                disabled={mutationSendOTP.isPending}
                onClick={() => navigate(-1)}
              >
                Quay lại
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Flex>
    </EmailRegistrationFormWrapper>
  );
};

export default EmailRegistrationPage;
