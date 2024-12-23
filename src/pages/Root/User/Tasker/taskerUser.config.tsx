import { Button, Flex, TableProps } from "antd";
import { IUserTaskerEntity } from "../../../../types/response/root/user";
import { convertTimestampToVietnamTime } from "../../../../utils/convertTime";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import constantRoutesGlobal from "../../../../constants/routes/global";
import ModalConfirmRemove from "../Partials/ModalConfirmRemove/ModalConfirmRemove";

interface IActionsProps {
  taskerData: IUserTaskerEntity;
}

const Actions: FC<IActionsProps> = ({ taskerData }) => {
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const handleViewDetails = () => {
    navigate(`/${constantRoutesGlobal.profileTasker}/${taskerData.username}`);
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
      <ModalConfirmRemove.Tasker
        taskerData={taskerData}
        isShow={isShowModal}
        onClose={() => setIsShowModal(false)}
      />
    </>
  );
};

const columnsTaskerTable: TableProps<IUserTaskerEntity>["columns"] = [
  {
    key: "STT",
    fixed: "left",
    width: 50,
    title: (
      <Flex align="center" justify="center">
        STT{" "}
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
    width: 280,
    title: "Công ty",
    key: "company",
    dataIndex: "company",
    render: (company: string) => company,
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
    render: (_, record) => <Actions taskerData={record} />,
  },
];

export { columnsTaskerTable };
