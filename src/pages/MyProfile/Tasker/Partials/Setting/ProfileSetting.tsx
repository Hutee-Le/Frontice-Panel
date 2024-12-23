import { Flex, Button, Form, Typography, Input, Row, Col, Tooltip } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import constantRoutesMentor from "../../../../../constants/routes/mentor";
import useAuthStore from "../../../../../store/Auth/authStore";
import { IUpdateProfileTaskerRequest } from "../../../../../types/request/auth";
import { AvatarMentor } from "../../../Mentor/Partials/AvatarMentor";
import { ConfirmModifiedModal } from "../../../Mentor/Partials/Setting/Partials/ConfirmModifieModal";

type IFormSettingProfile = IUpdateProfileTaskerRequest;

type IDataModified = {
  [key in keyof IFormSettingProfile]: {
    before: string;
    after: string;
  };
};

const { Title } = Typography;
const TaskerProfileSetting = () => {
  const navigate = useNavigate();
  const profile = useAuthStore((state) => state.profile);
  const [isDisabled, setIsDisabled] = useState(true);
  const [dataModified, setDataModified] = useState<IDataModified | null>(null);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState<boolean>(false);
  const [form] = Form.useForm<IFormSettingProfile>();
  const initialFormValues: IFormSettingProfile = {
    username: profile?.username || "",
    firstname: profile?.firstname || "",
    lastname: profile?.lastname || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    bio: profile?.bio || "",
    company: profile?.company || "",
  };
  const handleCloseModal = () => {
    setIsShowModalConfirm(false);
  };
  const handleValuesChange = () => {
    const currentValues = form.getFieldsValue();
    const isChanged = Object.keys(initialFormValues).some(
      (key) =>
        currentValues[key as keyof IFormSettingProfile] !==
        initialFormValues[key as keyof IFormSettingProfile],
    );
    setIsDisabled(!isChanged);
  };

  const handleFinish = (values: IUpdateProfileTaskerRequest) => {
    const changedFields = Object.keys(initialFormValues).reduce(
      (acc, key) => {
        const oldValue = initialFormValues[key as keyof IFormSettingProfile];
        const newValue = values[key as keyof IFormSettingProfile];
        if (oldValue !== newValue) {
          acc[key] = { before: oldValue || "", after: newValue || "" };
        }
        return acc;
      },
      {} as Record<string, { before: string; after: string }>,
    );

    if (
      changedFields &&
      typeof changedFields === "object" &&
      Object.keys(changedFields).length > 0
    ) {
      setDataModified({ ...changedFields } as IDataModified);
      setIsShowModalConfirm(true);
    }
  };
  return (
    <>
      <Flex vertical gap={32}>
        <Flex align="center" justify="center" vertical gap={32}>
          <Title level={3} style={{ margin: "0" }}>
            Cài đặt cá nhân
          </Title>
          <AvatarMentor currentAvatar={profile?.image || null} />
        </Flex>
        <Form<IFormSettingProfile>
          form={form}
          layout="vertical"
          initialValues={initialFormValues}
          onValuesChange={handleValuesChange}
          autoComplete="off"
          onFinish={handleFinish}
        >
          <Form.Item<IFormSettingProfile>
            name={"company"}
            label={"Tên công ty"}
            rules={[
              { required: true, message: "Tên công ty không được trống" },
            ]}
          >
            <Input />
          </Form.Item>

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

          <Form.Item<IFormSettingProfile>
            label="Username"
            name={"username"}
            rules={[
              { required: true, message: "Username không được bỏ trống" },
            ]}
          >
            <Input placeholder="Nhập họ và tên của bạn" />
          </Form.Item>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item<IFormSettingProfile>
                name={"firstname"}
                label="Họ và tên đệm"
                rules={[
                  {
                    required: true,
                    message: "Họ và tên đệm không được bỏ trống",
                  },
                ]}
              >
                <Input placeholder="Nhận họ và tên đệm..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<IFormSettingProfile>
                name={"lastname"}
                label="Tên"
                rules={[
                  {
                    required: true,
                    message: "Tên không được bỏ trống",
                  },
                ]}
              >
                <Input placeholder="Nhập tên..." />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item<IFormSettingProfile>
            name={"email"}
            label="Email"
            rules={[{ required: true, message: "Email không được bỏ trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<IFormSettingProfile> name={"bio"} label="Bio">
            <Input.TextArea placeholder="Nhập lời giới thiệu" rows={4} />
          </Form.Item>

          <Flex justify="start" align="center" gap={12}>
            <Button
              style={{ width: "100%" }}
              variant="solid"
              color="primary"
              size="large"
              disabled={isDisabled}
              htmlType="submit"
            >
              Cập nhật
            </Button>
            <Button
              style={{ width: "30%" }}
              size="large"
              onClick={() => navigate(`/${constantRoutesMentor.profile.root}`)}
            >
              Quay lại
            </Button>
          </Flex>
        </Form>
      </Flex>
      <ConfirmModifiedModal
        isShow={isShowModalConfirm}
        dataModified={dataModified}
        onClose={() => handleCloseModal()}
      />
    </>
  );
};

export default TaskerProfileSetting;
