import { Button, Flex, Form, Input, Typography } from "antd";
import { IChangePasswordRequest } from "../../../../../types/request/auth";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../../../../store/Auth/authStore";
import mutationKey from "../../../../../constants/mutation";
import authService from "../../../../../service/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import constantRoutesMentor from "../../../../../constants/routes/mentor";

type IFormFieldType = IChangePasswordRequest;

const { Title } = Typography;
const initialFormValues: IFormFieldType = {
  current_password: "",
  password: "",
  password_confirmation: "",
};

const MentorChangePassword = () => {
  const [form] = Form.useForm<IFormFieldType>();
  const accountId = useAuthStore((state) => state.profile?.id);
  const navigate = useNavigate();

  const mutationChangePassword = useMutation({
    mutationKey: [mutationKey.changePassword, accountId],
    mutationFn: async (data: IChangePasswordRequest) =>
      await authService.changePassword(data),
  });

  const handleFinish = async (values: IFormFieldType) => {
    return await toast.promise(
      mutationChangePassword.mutateAsync(values).then(() => {
        navigate(
          `/${constantRoutesMentor.profile.root}/${constantRoutesMentor.profile.details}`,
        );
      }),
      {
        pending: "Đang thực hiện đổi mật khẩu",
        success: "Đổi mật khẩu thành công",
        error: "Đổi mật khẩu thất bại",
      },
    );
  };
  return (
    <Flex vertical gap={32}>
      <Flex justify="center" align="center">
        <Title level={3}>Đổi mật khẩu</Title>
      </Flex>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={initialFormValues}
      >
        <Form.Item<IFormFieldType>
          label="Mật khẩu hiện tại"
          name="current_password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu hiện tại!" },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu hiện tại" />
        </Form.Item>

        <Form.Item<IFormFieldType>
          label="Mật khẩu mới"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới!" },
            { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("current_password") !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu mới không được giống mật khẩu hiện tại!"),
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu mới" />
        </Form.Item>

        <Form.Item<IFormFieldType>
          label="Xác nhận mật khẩu mới"
          name="password_confirmation"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp với mật khẩu mới!"),
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Xác nhận mật khẩu mới" />
        </Form.Item>

        <Form.Item>
          <Flex gap={12}>
            <Button
              type="primary"
              htmlType="submit"
              loading={mutationChangePassword.isPending}
              size="large"
              block
            >
              Đổi mật khẩu
            </Button>

            <Button
              size="large"
              onClick={() => navigate(`/${constantRoutesMentor.profile.root}`)}
              style={{
                width: "30%",
              }}
            >
              Quay lại
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default MentorChangePassword;
