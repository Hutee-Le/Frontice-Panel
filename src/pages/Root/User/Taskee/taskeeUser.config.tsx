import { Button, Flex, TableProps } from "antd";
import { IUserTaskeeEntity } from "../../../../types/response/root/user";
import { convertTimestampToVietnamTime } from "../../../../utils/convertTime";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import constantRoutesGlobal from "../../../../constants/routes/global";
import { CheckOutlined } from "@ant-design/icons";
import ModalConfirmRemove from "../Partials/ModalConfirmRemove/ModalConfirmRemove";

interface IActionsProps {
  taskeeData: IUserTaskeeEntity;
}
const Actions: FC<IActionsProps> = ({ taskeeData }) => {
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const handleViewDetails = () => {
    navigate(`/${constantRoutesGlobal.profileTaskee}/${taskeeData.username}`);
  };

  const handleRemove = () => {
    setIsShowModal(true);
  };

  return (
    <>
      <Flex justify="start" align="center" gap={8}>
        <Button onClick={handleViewDetails}>Xem chi tiết</Button>
        <Button variant="outlined" color="danger" onClick={handleRemove}>
          Xóa tài khoản
        </Button>
      </Flex>
      <ModalConfirmRemove.Taskee
        taskeeData={taskeeData}
        isShow={isShowModal}
        onClose={() => setIsShowModal(false)}
      />
    </>
  );
};

const columnsTaskeeTable: TableProps<IUserTaskeeEntity>["columns"] = [
  {
    key: "STT",
    fixed: "left",
    width: 50,
    title: (
      <Flex align="center" justify="center">
        STT
      </Flex>
    ),
    render: (_, __, index) => (
      <Flex justify="center" align="center">
        {index + 1}
      </Flex>
    ),
  },
  {
    key: "email",
    fixed: "left",
    width: 280,
    title: "Email",
    dataIndex: "email",
    render: (email: string) => email,
  },
  {
    width: 180,
    key: "username",
    title: "Username",
    dataIndex: "username",
    render: (username: string) => username,
  },
  {
    width: 200,
    key: "fullName",
    title: "Họ và tên",
    render: (_, record) => `${record.firstname} ${record.lastname}`,
  },
  {
    width: 100,
    key: "isPremium",
    title: (
      <Flex align="center" justify="center">
        Premium
      </Flex>
    ),
    render: (_, record) => (
      <Flex justify="center" align="center">
        {record.gold_account && <CheckOutlined style={{ color: "blue" }} />}
      </Flex>
    ),
  },
  {
    width: 200,
    key: "premiumExpired",
    title: "Thời hạn Premium",
    render: (_, record) => {
      if (record.goldExpires && record.gold_account) {
        return record.goldExpires;
      }

      return;
    },
  },
  {
    width: 240,
    key: "challengeJoined",
    title: (
      <Flex justify="center" align="center">
        Thử thách tham gia
      </Flex>
    ),
    dataIndex: "challengeJoined",
    render: (challengeJoined: number) => (
      <Flex align="center" justify="center">
        {challengeJoined}
      </Flex>
    ),
  },
  {
    width: 240,
    key: "challengeSubmitted",
    title: (
      <Flex justify="center" align="center">
        Thử thách hoàn thành
      </Flex>
    ),
    dataIndex: "submittedChallenges",
    render: (submittedChallenges: number) => (
      <Flex align="center" justify="center">
        {submittedChallenges}
      </Flex>
    ),
  },
  {
    width: 200,
    key: "createdAt",
    title: "Thời gian tạo",
    dataIndex: "createdAt",
    render: (createdAt: number) => convertTimestampToVietnamTime(createdAt),
  },

  {
    width: 300,
    fixed: "right",
    key: "actions",
    title: "Hành động",
    render: (_, record) => <Actions taskeeData={record} />,
  },
];

export { columnsTaskeeTable };
