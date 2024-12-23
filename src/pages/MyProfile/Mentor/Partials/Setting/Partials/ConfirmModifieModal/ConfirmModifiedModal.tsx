import { Flex, Input, Modal, Typography } from "antd";
import { FC } from "react";
import { IUpdateProfileMentorRequest } from "../../../../../../../types/request/auth";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import mutationKey from "../../../../../../../constants/mutation";
import useAuthStore from "../../../../../../../store/Auth/authStore";
import authService from "../../../../../../../service/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import constantRoutesMentor from "../../../../../../../constants/routes/mentor";

interface IConfirmModifiedModalProps {
  isShow: boolean;
  dataModified: {
    [key: string]: {
      before: string;
      after: string;
    };
  } | null;
  onClose: () => void;
}

const { Text } = Typography;
const ConfirmModifiedModal: FC<IConfirmModifiedModalProps> = ({
  isShow,
  dataModified,
  onClose,
}) => {
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const navigate = useNavigate();
  const accountId = useAuthStore((state) => state.profile?.id);
  console.log("tseting: ", dataModified);

  const mutationUpdateProfile = useMutation({
    mutationKey: [mutationKey.updateProfile, accountId],
    mutationFn: async (data: IUpdateProfileMentorRequest) =>
      await authService.updateProfile(data),
  });

  if (!dataModified) {
    return;
  }

  const objectsModified = generateObjectModified(dataModified);

  const handleOnOk = async () => {
    const mapDataObject: {
      [key: string]: string;
    } = {};

    Object.entries(dataModified).forEach(([key, value]) => {
      mapDataObject[key] = value.after;
    });

    return await toast.promise(
      mutationUpdateProfile.mutateAsync(mapDataObject).then((response) => {
        updateProfile(response.data);
        navigate(
          `/${constantRoutesMentor.profile.root}/${constantRoutesMentor.profile.details}`,
        );
      }),
      {
        pending: "Đang thực hiện cập nhật thông tin",
        error: "Cập nhật thông tin thất bại",
        success: "Cập nhật thông tin thành công",
      },
    );
  };
  return (
    <Modal
      open={isShow}
      onCancel={onClose}
      title="Thông tin thay đổi"
      onOk={handleOnOk}
      okText="Xác nhận thay đổi"
      cancelText="Hủy bỏ"
      okButtonProps={{
        loading: mutationUpdateProfile.isPending,
      }}
      cancelButtonProps={{
        disabled: mutationUpdateProfile.isPending,
      }}
    >
      <Flex vertical gap={24} style={{ margin: "12px 0 24px" }}>
        {Object.entries(objectsModified).map(([key, value]) => (
          <Flex vertical gap={8}>
            <Text style={{ textTransform: "capitalize", fontWeight: "bold" }}>
              {value.nameLabel}
            </Text>
            <Flex justify="start" align="stretch" gap={24} key={key}>
              <Input disabled defaultValue={value.before} />
              <ArrowRightOutlined />
              <Input
                defaultValue={value.after}
                value={value.after}
                disabled
                style={{
                  background: "#49CA90",
                  color: "white",
                  borderColor: "#49CA90",
                }}
              />
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Modal>
  );
};

type IResult = {
  [key in keyof IUpdateProfileMentorRequest]: {
    nameLabel?: string;
    before?: string;
    after?: string;
  };
};

function generateObjectModified(objects: {
  [key in keyof IUpdateProfileMentorRequest]: {
    before: string;
    after: string;
  };
}) {
  const result: IResult = {};
  const labelMap: Record<
    keyof Omit<IUpdateProfileMentorRequest, "image">,
    string
  > = {
    username: "Username",
    email: "Email",
    fullname: "Họ và tên",
  };
  Object.entries(objects).forEach(([key, value]) => {
    const typedKey = key as keyof Omit<IUpdateProfileMentorRequest, "image">;

    if (labelMap[typedKey]) {
      result[typedKey] = {
        nameLabel: labelMap[typedKey],
        before: value.before,
        after: value.after,
      };
    }
  });

  return result;
}

export default ConfirmModifiedModal;
