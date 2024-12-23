import { FC } from "react";
import { IGetProfileTaskeeResponse } from "../../types/response/taskee";
import { Typography } from "antd";
import { openNewTab } from "../../utils/helper";

interface IEmptyTextProps {
  text: string;
}

const EmptyText: FC<IEmptyTextProps> = ({ text }) => {
  return <div style={{ color: "#EA5B33" }}>{text}</div>;
};

const { Text } = Typography;
const generateItemDescription = (data?: IGetProfileTaskeeResponse) => {
  if (!data) {
    return [];
  }
  return [
    {
      key: "fullName",
      label: "Họ và tên",
      children: (
        <Text
          copyable={{
            text: `${data?.firstname} ${data?.lastname}`,
            tooltips: ["Sao chép họ và tên", "Bạn đã sao chép"],
          }}
        >
          {data?.firstname} {data?.lastname}
        </Text>
      ),
    },
    {
      key: "email",
      label: "Email",
      children: (
        <Text
          copyable={{
            text: data?.email,
            tooltips: ["Sao chép email", "Bạn đã sao chép email"],
          }}
        >
          {data?.email}
        </Text>
      ),
    },
    {
      key: "username",
      label: "Username",
      children: data?.username,
    },
    {
      key: "phone",
      label: "Số điện thoại",
      children: data?.phone || <EmptyText text="Không có" />,
    },
    {
      key: "point",
      label: "Điểm số",
      children: data?.point || 0,
    },
    {
      key: "typeAccount",
      label: "Loại tài khoản",
      children: data?.gold_account ? (
        <div style={{ color: "#FFB82E" }}>Premium</div>
      ) : (
        <div>Thường</div>
      ),
    },
    {
      key: "github",
      label: "Github",
      children: data?.github ? (
        <Text
          onClick={() => openNewTab(data?.github)}
          underline
          style={{ cursor: "pointer" }}
          copyable={{
            text: data?.github,
            tooltips: ["Sao chép đường dẫn", "Bạn đã sao chép đường dẫn!!"],
          }}
        >
          Xem ngay
        </Text>
      ) : (
        <EmptyText text="Không có" />
      ),
    },
    {
      key: "cv",
      label: "CV",
      children: data?.cv ? (
        <div
          onClick={() => openNewTab(data.cv)}
          style={{
            padding: "0",
            margin: "0",
            textDecoration: "underline",
            color: "blue",
            cursor: "pointer",
          }}
        >
          Xem CV
        </div>
      ) : (
        <EmptyText text="Không có" />
      ),
    },
    {
      key: "bio",
      label: "Bio",
      children: data?.bio,
    },
  ];
};

export { generateItemDescription };
