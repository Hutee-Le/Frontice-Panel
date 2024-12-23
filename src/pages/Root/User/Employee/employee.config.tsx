import { Button, Flex, TableProps } from "antd";
import { IUserEmployeeEntity } from "../../../../types/response/root/user";
import { convertTimestampToVietnamTime } from "../../../../utils/convertTime";
import { FC, useState } from "react";
import ModalConfirmRemove from "../Partials/ModalConfirmRemove/ModalConfirmRemove";

interface IActionsProps {
  employData: IUserEmployeeEntity;
}
const Actions: FC<IActionsProps> = ({ employData }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const handleRemove = () => {
    setIsShowModal(true);
  };

  return (
    <>
      <Flex justify="start" align="center" gap={8}>
        {/* <Button onClick={handleViewDetails}>Xem chi tiết</Button> */}
        <Button variant="outlined" color="danger" onClick={handleRemove}>
          Xóa tài khoản
        </Button>
      </Flex>
      <ModalConfirmRemove.Employee
        employeeData={employData}
        isShow={isShowModal}
        onClose={() => setIsShowModal(false)}
      />
    </>
  );
};

const columnsEmloyeeTable: TableProps<IUserEmployeeEntity>["columns"] = [
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
    dataIndex: "fullname",
    render: (fullName: string) => fullName,
  },
  {
    key: "adminRole",
    title: (
      <Flex justify="stary" align="center">
        Chức vụ
      </Flex>
    ),
    width: 180,
    dataIndex: "adminRole",
    render: (adminRole: IUserEmployeeEntity["adminRole"]) => {
      if (adminRole === "mentor") {
        return "Hỗ trợ";
      }

      if (adminRole === "challenge") {
        return "Quản lí thử thách";
      }
    },
  },
  {
    width: 200,
    key: "createdAt",
    title: "Thời gian tạo",
    dataIndex: "createdAt",
    render: (createdAt: number) => convertTimestampToVietnamTime(createdAt),
  },

  {
    width: 200,
    fixed: "right",
    key: "actions",
    title: "Hành động",
    render: (_, record) => <Actions employData={record} />,
  },
];

export { columnsEmloyeeTable };
