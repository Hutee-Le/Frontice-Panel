import { Flex, TableProps } from "antd";
import { IRootTaskerApprove } from "../../../../types/response/root/tasker";
import { convertTimestampToVietnamTime } from "../../../../utils/convertTime";
import { ActionsRequestApprove } from "./Partials/Actions";

const columnsRequestApproveTable: TableProps<IRootTaskerApprove>["columns"] = [
  {
    width: 60,
    fixed: "left",
    key: "stt",
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
    width: 200,
    fixed: "left",
    title: "Người đại diện",
    key: "fullName",
    render: (_, record) => (
      <div>
        {record.firstname} {record.lastname}
      </div>
    ),
  },
  {
    width: 300,
    title: "Email",
    key: "email",
    dataIndex: "email",
    render: (email: string) => <div>{email}</div>,
  },
  {
    width: 300,
    title: "Công ty",
    key: "company",
    dataIndex: "company",
    render: (company: string) => <div>{company}</div>,
  },
  {
    width: 200,
    title: (
      <Flex align="center" justify="center">
        Thời gian tạo
      </Flex>
    ),
    key: "createdAt",
    dataIndex: "createdAt",
    render: (createdAt: number) => (
      <Flex justify="center" align="center">
        {convertTimestampToVietnamTime(createdAt)}
      </Flex>
    ),
  },
  {
    align: "center",
    fixed: "right",
    width: 200,
    key: "actions",
    render: (_, record) => <ActionsRequestApprove taskerId={record.id} />,
  },
];

export { columnsRequestApproveTable };
