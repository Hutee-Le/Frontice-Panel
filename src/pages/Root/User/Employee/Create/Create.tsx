import { useMutation } from "@tanstack/react-query";
import { Form, Input, Button, Select, Typography, Flex, Row, Col } from "antd";
import mutationKey from "../../../../../constants/mutation";
import { FormProps } from "antd/es/form/Form";
import { ICreateEmployeeUserRequest } from "../../../../../types/request/root/user";
import rootService from "../../../../../service/Root/RootService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import constantRoutesRoot from "../../../../../constants/routes/root";

const { Option } = Select;
const { Title } = Typography;

const validateMessages = {
  required: "${label} không được bỏ trống!",
  types: {
    email: "${label} không đúng định dạng email!",
  },
  string: {
    min: "${label} phải có ít nhất ${min} ký tự!",
  },
  pattern: {
    mismatch: "${label} không đúng định dạng!",
  },
};

const EmployeeUserCreatePage = () => {
  const navigate = useNavigate();
  const onFinish: FormProps<ICreateEmployeeUserRequest>["onFinish"] = async (
    formValue,
  ) => {
    return await toast.promise(
      mutationCreateEmployeeUser.mutateAsync(formValue).then(() => {
        navigate(`/${constantRoutesRoot.user.root}`);
      }),
      {
        pending: "Đang thực hiện tạo tài khoản",
        success: "Tạo tài khoản thành công",
        error: "Tạo tài khoản thất bại",
      },
    );
  };

  const mutationCreateEmployeeUser = useMutation({
    mutationKey: [mutationKey.createEmployeeUser],
    mutationFn: async (data: ICreateEmployeeUserRequest) =>
      await rootService.user.createEmployeeUser(data),
  });

  return (
    <Flex vertical gap={32} justify="center" align="center">
      <Title level={3}>Tạo tài khoản nhân viên</Title>
      <Form<ICreateEmployeeUserRequest>
        style={{ width: "800px" }}
        layout="vertical"
        name="accountCreation"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        {/* Role */}
        <Form.Item<ICreateEmployeeUserRequest>
          name="adminRole"
          label="Vai trò"
          rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
        >
          <Select placeholder="Chọn vai trò">
            <Option value="challenge">Quản lí thử thách</Option>
            <Option value="mentor">Hỗ trợ</Option>
          </Select>
        </Form.Item>
        {/* Full Name */}
        <Form.Item<ICreateEmployeeUserRequest>
          name="fullname"
          label="Họ và Tên"
          rules={[{ required: true }]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        {/* Username */}
        <Form.Item<ICreateEmployeeUserRequest>
          name="username"
          label="Tên tài khoản"
          rules={[
            { required: true },
            {
              pattern: /^\S*$/,
              message: "Tên tài khoản không được chứa khoảng trống!",
            },
          ]}
        >
          <Input placeholder="Nhập tên tài khoản" />
        </Form.Item>

        {/* Email */}
        <Form.Item<ICreateEmployeeUserRequest>
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        {/* Phone */}
        <Form.Item<ICreateEmployeeUserRequest>
          name="phone"
          label="Số điện thoại"
          rules={[
            { required: true },
            {
              pattern: /^(03|05|07|08|09)\d{8}$/,
              message: "Số điện thoại không đúng định dạng Việt Nam!",
            },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        {/* Password */}
        <Form.Item<ICreateEmployeeUserRequest>
          name="password"
          label="Mật khẩu"
          rules={[
            { required: true },
            { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        {/* Password Confirmation */}
        <Form.Item<ICreateEmployeeUserRequest>
          name="password_confirmation"
          label="Xác nhận mật khẩu"
          dependencies={["password"]}
          rules={[
            { required: true },
            { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" />
        </Form.Item>

        {/* Submit Button */}
        <Row gutter={12}>
          <Col span={16}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="middle"
                loading={mutationCreateEmployeeUser.isPending}
              >
                Tạo tài khoản
              </Button>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item>
              <Button
                block
                size="middle"
                disabled={mutationCreateEmployeeUser.isPending}
              >
                Quay lại
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Flex>
  );
};

export default EmployeeUserCreatePage;
