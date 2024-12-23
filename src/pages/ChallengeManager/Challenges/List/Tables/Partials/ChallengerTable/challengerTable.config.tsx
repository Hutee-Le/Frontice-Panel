import { Button, Flex, TableProps } from "antd";
import { ITaskeeEntity } from "../../../../../../../types/entity/taskee";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import constantRoutesGlobal from "../../../../../../../constants/routes/global";

const challengerTableColumns: TableProps<ITaskeeEntity>["columns"] = [
  {
    title: <div style={{ textAlign: "center" }}>STT</div>,
    key: "stt",
    render: (_, __, index) => (
      <div style={{ textAlign: "center" }}>{index + 1}</div>
    ),
  },
  {
    title: "Họ tên",
    key: "name",
    dataIndex: "lastname",
    render: (_, record) => `${record.firstname} ${record.lastname}`,
  },
  {
    title: "Username",
    key: "username",
    dataIndex: "username",
    render: (username: string) => (
      <div style={{ textAlign: "start" }}>{username}</div>
    ),
  },
  {
    title: (
      <Flex align="center" justify="center">
        Premium
      </Flex>
    ),
    key: "premium",
    dataIndex: "gold_registration_date",
    render: (_, record) => {
      return Boolean(record?.gold_account) ? (
        <div style={{ textAlign: "center" }}>
          <CheckOutlined />
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <CloseOutlined />
        </div>
      );
    },
  },

  {
    title: "Hành động",
    key: "actions",
    render: (_, record) => (
      <ButtonNavigateDetailsChallenger taskeeUsername={record.username} />
    ),
  },
];

interface IButtonNavigateDetailsChallengerProps {
  taskeeUsername: string;
}

const ButtonNavigateDetailsChallenger: FC<
  IButtonNavigateDetailsChallengerProps
> = ({ taskeeUsername }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={() =>
        navigate(`/${constantRoutesGlobal.profileTaskee}/${taskeeUsername}`)
      }
    >
      Xem chi tiết
    </Button>
  );
};

export default challengerTableColumns;
