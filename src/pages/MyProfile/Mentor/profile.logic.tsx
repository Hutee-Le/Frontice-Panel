import type { DescriptionsProps } from "antd";
import { IMentorInfoEntity } from "../../../types/entity/meInfo";
import { convertTimestampToVietnamTime } from "../../../utils/convertTime";

const itemDescriptionMentorProfile: (
  params: IMentorInfoEntity,
) => DescriptionsProps["items"] = (dataProfile) => {
  return [
    {
      key: "fullName",
      label: "Họ và tên",
      children: dataProfile.fullname,
    },
    {
      key: "email",
      label: "Email",
      children: dataProfile.email,
    },
    {
      key: "role",
      label: "Chức vụ",
      children:
        dataProfile.adminRole === "mentor" ? (
          <div>ADMIN - Người hỗ trợ</div>
        ) : dataProfile.adminRole === "root" ? (
          <div>ADMIN - Quản lí website</div>
        ) : dataProfile.adminRole === "tasker" ? (
          <div> Công ty tuyển dụng</div>
        ) : dataProfile.adminRole === "challenge" ? (
          <div>ADMIN - Quản lí thử thách</div>
        ) : (
          <div>Không xác định</div>
        ),
    },
    {
      key: "username",
      label: "Username",
      children: dataProfile.username,
    },
    {
      key: "createdAt",
      label: "Thời gian tạo",
      children: convertTimestampToVietnamTime(dataProfile.createdAt),
    },
  ];
};

export { itemDescriptionMentorProfile };
