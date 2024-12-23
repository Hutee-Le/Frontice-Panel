import { DescriptionsProps } from "antd";
import { IMeInfo } from "../../../types/entity/meInfo";
import { convertTimestampToVietnamTime } from "../../../utils/convertTime";

const itemDescriptionTaskerProfile: (
  params: IMeInfo,
) => DescriptionsProps["items"] = (dataProfile) => {
  return [
    {
      key: "company",
      label: "Công ty",
      children: dataProfile?.company,
    },
    {
      key: "fullName",
      label: "Họ và tên",
      children: `${dataProfile?.firstname} ${dataProfile?.lastname}`,
    },
    {
      key: "email",
      label: "Email",
      children: dataProfile?.email,
    },
    {
      key: "phone",
      label: "Số điện thoại",
      children: dataProfile?.phone,
    },
    {
      key: "role",
      label: "Chức vụ",
      children: "Tasker - Người tuyển dụng",
    },
    {
      key: "username",
      label: "Username",
      children: dataProfile?.username,
    },
    {
      key: "createdAt",
      label: "Thời gian tạo",
      children: convertTimestampToVietnamTime(dataProfile.createdAt),
    },
    {
      key: "bio",
      label: "Bio",
      children: dataProfile?.bio,
    },
  ];
};

export { itemDescriptionTaskerProfile };
