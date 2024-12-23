import styled from "@emotion/styled";
import { Flex, Typography, Form, Button, Col, Input, Row, Tooltip } from "antd";
import { FC, useEffect } from "react";
import { BrandColorLogo } from "../../../assets/images/logos/locals";
import { FormProps } from "rc-field-form";
import { IRegisterTaskerRequest } from "../../../types/request/auth";
import { useMutation } from "@tanstack/react-query";
import mutationKey from "../../../constants/mutation";
import authService from "../../../service/authService";
import { useLocation, useNavigate } from "react-router";
import constantRoutesAuth from "../../../constants/routes/authentication";
import { toast } from "react-toastify";
import constantRoutesGlobal from "../../../constants/routes/global";

const LogoWrapper = styled.div`
  width: 220px;
  heigh: auto;

  & > img {
    width: 100%;
    heigh: 100%;
    object-fit: cover;
  }
`;

const RegisterFormWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: "center";
  align-items: center;
`;

type IFormFieldData = IRegisterTaskerRequest;

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailRegistration = location.state?.emailRegistration as string;
  const verifyEmailSucceess = location.state?.verifyEmailSuccess as string;
  const [form] = Form.useForm<IFormFieldData>();
  const mutationRegisterTasker = useMutation({
    mutationKey: [mutationKey.regitserTasker],
    mutationFn: async (data: IRegisterTaskerRequest) =>
      await authService.registerTasker(data),
  });

  const onFinish: FormProps<IFormFieldData>["onFinish"] = async (
    formValues,
  ) => {
    return await toast.promise(
      mutationRegisterTasker
        .mutateAsync({ ...formValues, role: "tasker" })
        .then((response) => {
          const newPath = location.pathname.replace(
            constantRoutesAuth.tasker.register,
            constantRoutesAuth.tasker.registerSuccess,
          );
          navigate(newPath, {
            state: {
              emailRegistration: response.data.email,
              isRegisterSuccess: true,
            },
          });
        }),
      {
        pending: "Đang thực hiện đăng kí thông tin",
        success: "Đăng kí thông tin tài khoản thành công",
        error: "Đăng kí thông tin tài khoản thất bại",
      },
    );
  };

  useEffect(() => {
    if (!Boolean(emailRegistration) && !Boolean(verifyEmailSucceess)) {
      return navigate(constantRoutesGlobal.errorPage["404"]);
    }
  }, [location.state]);

  return (
    <RegisterFormWrapper>
      <Flex
        flex={1}
        vertical
        gap={32}
        justify="center"
        align="center"
        style={{ width: "fit-content" }}
      >
        <Flex vertical justify="center" align="center">
          <LogoWrapper>
            <img src={BrandColorLogo} />
          </LogoWrapper>
          <Typography style={{ fontSize: "16px" }}>
            Đăng kí với vai trò{" "}
            <span style={{ color: "#5250F7", fontWeight: "bold" }}>
              nhà tuyển dụng
            </span>
          </Typography>
        </Flex>

        <Form<IFormFieldData>
          form={form}
          name="register"
          initialValues={{ role: "tasker", email: emailRegistration }}
          style={{ maxWidth: "400px" }}
          autoComplete="off"
          onFinish={onFinish}
          layout="vertical"
        >
          {/* Họ và Tên */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Họ"
                name="firstname"
                rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
              >
                <Input placeholder="Nhập họ" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tên"
                name="lastname"
                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
              >
                <Input placeholder="Nhập tên" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Công ty"
            name="company"
            rules={[{ required: true, message: "Vui lòng nhập tên công ty!" }]}
          >
            <Input placeholder="Nhập tên công ty" />
          </Form.Item>

          {/* Tên tài khoản */}
          <Form.Item
            label="Tên tài khoản"
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên tài khoản!" },
            ]}
          >
            <Input placeholder="Nhập tên tài khoản" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            initialValue={emailRegistration}
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              placeholder="Nhập email"
              defaultValue={emailRegistration}
              disabled
            />
          </Form.Item>

          {/* Số điện thoại */}
          <Form.Item
            label={
              <span>
                Số điện thoại&nbsp;
                <Tooltip
                  color="blue"
                  title="Số điện thoại có thể được sử dụng để quản lý trang web hoặc gọi xác minh doanh nghiệp."
                >
                  <Typography.Text
                    style={{ color: "#1890ff", cursor: "pointer" }}
                  >
                    ?
                  </Typography.Text>
                </Tooltip>
              </span>
            }
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          {/* Mật khẩu */}
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
            ]}
          >
            <Input.Password autoComplete="off" placeholder="Nhập mật khẩu" />
          </Form.Item>

          {/* Xác nhận mật khẩu */}
          <Form.Item
            label="Xác nhận mật khẩu"
            name="password_confirmation"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp với mật khẩu!"),
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>

          {/* Công ty */}

          <Form.Item>
            <Row gutter={12}>
              <Col span={16}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={mutationRegisterTasker.isPending}
                >
                  Đăng ký
                </Button>
              </Col>
              <Col span={8}>
                <Button
                  type="default"
                  block
                  disabled={mutationRegisterTasker.isPending}
                >
                  Quay lại
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Flex>
    </RegisterFormWrapper>
  );
};

export default RegisterPage;
