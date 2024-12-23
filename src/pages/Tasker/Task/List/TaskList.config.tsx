import { TableProps } from "rc-table";
import { ITaskEntity } from "../../../../types/entity/task";
import { Flex, Tag } from "antd";
import { ViewExpiredTime } from "../../../../components/Components/ViewExpiredTime";
import { ITaskOfTaskerEntity } from "../../../../types/response/tasker/task";
import { ActionsTaskTable } from "./Partials/ActionsTaskTable";
import { ViewTaskSolution } from "./Partials/ViewTaskSolution";

const columns: TableProps<ITaskOfTaskerEntity>["columns"] = [
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
    title: <div style={{ textAlign: "center" }}>Công nghệ</div>,
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
    fixed: "right",
    width: 340,
    title: "Hành động",
    key: "actions",
    render: (_, record) => <ActionsTaskTable taskId={record.id} />,
  },
];

export default columns;
