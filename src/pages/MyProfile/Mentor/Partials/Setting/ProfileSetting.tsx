import { Button, Flex, Form, Input, Typography } from "antd";
import { IUpdateProfileMentorRequest } from "../../../../../types/request/auth";
import { AvatarMentor } from "../AvatarMentor";
import useAuthStore from "../../../../../store/Auth/authStore";
import { useState } from "react";
import { ConfirmModifiedModal } from "./Partials/ConfirmModifieModal";
import { useNavigate } from "react-router-dom";
import constantRoutesMentor from "../../../../../constants/routes/mentor";

const { Title } = Typography;

type IFormSettingProfile = Omit<IUpdateProfileMentorRequest, "image">;

type IDataModified = {
  [key in keyof IFormSettingProfile]: {
    before: string;
    after: string;
  };
};

const MentorProfileSetting = () => {
  const navigate = useNavigate();
  const profile = useAuthStore((state) => state.profile);
  const [isDisabled, setIsDisabled] = useState(true);
  const [dataModified, setDataModified] = useState<IDataModified | null>(null);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState<boolean>(false);
  const [form] = Form.useForm<IFormSettingProfile>();
  const initialFormValues: IFormSettingProfile = {
    username: profile?.username || "",
    fullname: profile?.fullname || "",
    email: profile?.email || "",
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
  const handleFinish = (values: IUpdateProfileMentorRequest) => {
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
      setDataModified({ ...changedFields });
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
            label="Username"
            name={"username"}
            rules={[
              { required: true, message: "Username không được bỏ trống" },
            ]}
          >
            <Input placeholder="Nhập họ và tên của bạn" />
          </Form.Item>
          <Form.Item<IFormSettingProfile>
            name={"fullname"}
            label="Họ và tên"
            rules={[
              {
                required: true,
                message: "Họ và tên không được bỏ trống",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IFormSettingProfile>
            name={"email"}
            label="Email"
            rules={[{ required: true, message: "Email không được bỏ trống" }]}
          >
            <Input />
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

export default MentorProfileSetting;
