import { SwapOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Flex, Modal, Image, Upload, Typography, UploadProps } from "antd";
import { FC, useState } from "react";
import useAuthStore from "../../../../../../../store/Auth/authStore";
import uploadService from "../../../../../../../service/Upload";
import { toast } from "react-toastify";
import { logOnDev } from "../../../../../../../utils/helper";
import authService from "../../../../../../../service/authService";
import ImgCrop from "antd-img-crop";
import mutationKey from "../../../../../../../constants/mutation";

interface IAvatarMentorChangeModalProps {
  isShow: boolean;
  onClose: () => void;
  currentAvatar: string | null;
}

const { Text } = Typography;

const AvatarMentorChangeModal: FC<IAvatarMentorChangeModalProps> = ({
  isShow,
  onClose,
  currentAvatar,
}) => {
  const [pathAvatarUpload, setPathAvatarUpload] = useState<string | null>(null);
  const [avatarUpload, setAvatarUpload] = useState<string | null>(null);
  const [fileList, setFileList] = useState<UploadProps["fileList"]>([]);
  const accountId = useAuthStore((state) => state.profile?.id);
  const updateProfile = useAuthStore((state) => state.updateProfile);

  const mutationRemoveFile = useMutation({
    mutationKey: [mutationKey.removeAvatar, accountId],
    mutationFn: async (files: string[]) => {
      if (avatarUpload) {
        return await authService.removeFile({ path: files });
      }
    },
  });

  const mutationUploadAvatar = useMutation({
    mutationKey: ["upload-avatar", accountId],
    mutationFn: async (avatar: File) =>
      await uploadService.avatar.upload({ image: avatar }),
  });

  const mutationUpdateProfile = useMutation({
    mutationKey: ["update-profile", accountId],
    mutationFn: async () => {
      return await authService.updateProfile({ image: avatarUpload as string });
    },
  });

  const customRequestChangeAvatar: UploadProps["customRequest"] = async ({
    file,
    onSuccess,
    onError,
  }) => {
    return await toast.promise(
      mutationUploadAvatar
        .mutateAsync(file as File)
        .then((response) => {
          const imageResponsePath = response.data.path;
          const imageResponseLink = response.data.link;
          if (imageResponsePath && imageResponseLink && onSuccess) {
            setAvatarUpload(imageResponsePath);
            setPathAvatarUpload(imageResponsePath);
            setFileList([
              {
                uid: "123",
                name: "avatar-new",
                url: imageResponseLink,
              },
            ]);
            onSuccess(imageResponsePath);
            return;
          }
        })
        .catch((error) => {
          onError && onError(error);
        }),
      {
        pending: "Đang thực hiện đăng tải ảnh đại diện",
        success: "Đăng tải ảnh đại diện thành công",
        error: "Đăng tải ảnh đại diện thất bại",
      },
    );
  };

  const handleOnCancel = () => {
    Modal.confirm({
      title: "Xác nhận hủy bỏ thay đổi ảnh đại diện",
      content:
        "Bạn vừa đăng tải 1 ảnh đại diện mới nhưng chưa cập nhật cho tài khoản của mình, bạn chắc chắn mình sẽ hủy bỏ hình ảnh vừa đăng tải chứ ?",
      okText: "Xác nhận hủy bỏ",
      cancelText: "Quay lại",
      cancelButtonProps: { loading: mutationRemoveFile.isPending },
      onOk: async () => {
        if (avatarUpload) {
          await toast.promise(
            mutationRemoveFile
              .mutateAsync([avatarUpload])
              .then(() => {
                setPathAvatarUpload(null);
                setAvatarUpload(null);
                setFileList([]);
                onClose();
              })
              .catch((error) => {
                console.log("[ERROR REMOVE IMAGE]: ", error);
              }),
            {
              pending: "Đang thực hiện xóa hình ảnh",
              success: "Xóa thành công",
              error: "Xoá thất bại",
            },
          );
        }
      },
      onCancel: () => {
        logOnDev(
          "Modal confirm remove avatar upload and back to previous page",
        );
      },
    });
  };

  const handleOnOk = async () => {
    if (avatarUpload === null) {
      toast.error("bạn chưa đăng tải anh đại diện mới");
      return;
    }
    return toast.promise(
      mutationUpdateProfile.mutateAsync().then((response) => {
        if (currentAvatar) {
          mutationRemoveFile.mutate([currentAvatar]);
        }
        onClose();
        setFileList([]);
        setAvatarUpload(null);
        updateProfile(response.data);
      }),
      {
        pending: "Đang thực hiện cập nhật ảnh đại diện",
        error: "Cập nhật ảnh đại diện thất bại",
        success: "Cập nhật ảnh đại diện thành công",
      },
    );
  };

  return (
    <Modal
      open={isShow}
      onCancel={() => {
        if (avatarUpload) {
          return handleOnCancel();
        }
        onClose();
      }}
      onOk={handleOnOk}
      title="Thay đổi ảnh đại diện"
      okText="Thay đổi"
      cancelText="Hủy bỏ"
      cancelButtonProps={{
        color: "danger",
        variant: "outlined",
        disabled:
          mutationUploadAvatar.isPending || mutationRemoveFile.isPending,
      }}
      okButtonProps={{ disabled: !Boolean(avatarUpload) }}
    >
      <Flex
        justify="center"
        align="center"
        gap={32}
        style={{ margin: "24px 0" }}
      >
        <Flex justify="center" align="center" vertical gap={8}>
          <Text>Ảnh hiển tại</Text>
          <Image
            src={
              currentAvatar ||
              "https://img.freepik.com/premium-vector/man-empty-avatar-casual-business-style-vector-photo-placeholder-social-networks-resumes_885953-434.jpg"
            }
            style={{ borderRadius: "100%", objectFit: "cover" }}
            width={100}
            height={100}
          />
        </Flex>
        <SwapOutlined
          style={{ fontSize: "24px", marginTop: "30px", color: "#b0b0b0" }}
        />
        <Flex justify="center" align="center" gap={8} vertical>
          <Text>Ảnh mới</Text>
          <ImgCrop>
            <Upload
              listType="picture-circle"
              maxCount={1}
              style={{
                width: "200px",
              }}
              customRequest={customRequestChangeAvatar}
              disabled={mutationUploadAvatar.isPending}
              onRemove={async () => {
                if (pathAvatarUpload) {
                  await toast.promise(
                    mutationRemoveFile
                      .mutateAsync([pathAvatarUpload])
                      .then(() => {
                        setPathAvatarUpload(null);
                        setAvatarUpload(null);
                        setFileList([]);
                      }),
                    {
                      pending: "Đang thực hiện xóa hình ảnh",
                      success: "Xóa hình ảnh thành công",
                      error: "Xóa hình ảnh thành công",
                    },
                  );
                }
              }}
              fileList={fileList}
            >
              {!avatarUpload && "Đăng tải"}
            </Upload>
          </ImgCrop>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default AvatarMentorChangeModal;
