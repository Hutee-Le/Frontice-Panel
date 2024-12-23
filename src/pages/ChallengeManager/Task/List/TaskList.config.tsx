import { Flex, TableProps, Tag } from "antd";
import { ITaskEntity } from "../../../../types/entity/task";
import { ViewTaskSolution } from "../../../../components/Components/ViewTaskSolution";
import { ViewExpiredTime } from "../../../../components/Components/ViewExpiredTime";
import { ViewOwner } from "../../../../components/Components/ViewOwner";
import ActionTaskTable from "./Partials/Actions/ActionsTaskTable";

const columnsTaskTable: TableProps<ITaskEntity>["columns"] = [
  {
    fixed: "left",
    title: (
      <Flex align="center" justify="center">
        STT
      </Flex>
    ),
    key: "stt",
    width: 100,
    render: (_, __, index) => (
      <Flex justify="center" align="center">
        {index + 1}
      </Flex>
    ),
  },
  {
    fixed: "left",
    width: 300,
    title: "Tiêu đề",
    key: "title",
    dataIndex: "title",
  },
  {
    title: (
      <Flex align="center" justify="center">
        Điểm yêu cầu
      </Flex>
    ),
    width: 140,
    key: "requiredPoint",
    dataIndex: "requiredPoint",
    render: (requiredPoint: number) => (
      <Flex align="center" justify="center">
        {requiredPoint}
      </Flex>
    ),
  },
  {
    title: (
      <Flex align="center" justify="center">
        Tham gia
      </Flex>
    ),
    key: "joined",
    width: 140,
    dataIndex: "joinTotal",
    render: (joinTotal: number) => (
      <Flex align="center" justify="center">
        {joinTotal}
      </Flex>
    ),
  },
  {
    title: (
      <Flex align="center" justify="center">
        Hoàn thành
      </Flex>
    ),
    width: 140,
    key: "submiited",
    dataIndex: "submittedTotal",
    render: (submittedTotal: number, record) => (
      <ViewTaskSolution taskId={record.id} solutionQuantity={submittedTotal} />
    ),
  },
  {
    title: "Công nghệ",
    key: "technical",
    width: 200,
    dataIndex: "technical",
    render: (technicalList: ITaskEntity["technical"]) => {
      const [firstTechnical, secondTechinical, ...rest] = technicalList;
      const technicalShow = [firstTechnical, secondTechinical];

      return (
        <div className="technical-challenge">
          {technicalShow.map((technical, index) => (
            <Tag
              color="cyan"
              style={{ textTransform: "capitalize" }}
              key={`${technical}-${index}`}
            >
              {technical}
            </Tag>
          ))}
          {rest.length > 0 && <Tag color="red">+ {rest.length}</Tag>}
        </div>
      );
    },
  },
  {
    title: (
      <Flex align="center" justify="center">
        Thời gian còn lại
      </Flex>
    ),
    width: 200,
    key: "expiredTime",
    dataIndex: "expiredAt",
    render: (expiredAt: number) => (
      <Flex align="center" justify="center">
        <ViewExpiredTime expiredTime={expiredAt} />
      </Flex>
    ),
  },
  {
    title: "Tác giả",
    key: "owner",
    dataIndex: "owner",
    width: 400,
    render: (_, record) => (
      <ViewOwner
        navigateTo={"tasker"}
        company={record.owner.company}
        image={record.owner.image}
        username={record.owner.username}
        firstName={record.owner.firstname}
        lastName={record.owner.lastname}
      />
    ),
  },

  {
    fixed: "right",
    width: 200,
    title: "Hành động",
    key: "actions",
    render: (_, record) => <ActionTaskTable taskId={record.id} />,
  },
];

export default columnsTaskTable;
