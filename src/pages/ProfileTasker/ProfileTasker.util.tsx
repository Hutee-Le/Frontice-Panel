import { FC } from "react";
import { ITaskerEntity } from "../../types/entity/tasker";
import { convertTimestampToVietnamTime } from "../../utils/convertTime";

interface IEmptyTextProps {
  text: string;
}

const EmptyText: FC<IEmptyTextProps> = ({ text }) => {
  return <div style={{ color: "#EA5B33" }}>{text}</div>;
};

const generateItemsDescriptionProfileTasker = (data?: ITaskerEntity) => {
  return [
    {
      key: "company",
      label: "Tên công ty",
      children: data?.company,
    },
    {
      key: "fullName",
      label: "Người đại diện",
      children: `${data?.firstname} ${data?.lastname}`,
    },
    {
      key: "email",
      label: "Email",
      children: data?.email,
    },
    {
      key: "username",
      label: "Username",
      children: data?.username || <EmptyText text="Không có" />,
    },
    {
      key: "phone",
      label: "Số điện thoại",
      children: data?.phone || <EmptyText text="Không có" />,
    },
    {
      key: "createdAt",
      label: "Thời gian tạo",
      children: convertTimestampToVietnamTime(data?.createdAt || 0),
    },
    {
      key: "bio",
      label: "Bio",
      children: data?.bio || <EmptyText text="Chưa có bio" />,
    },
  ];
};

export default generateItemsDescriptionProfileTasker;
