import { useQuery } from "@tanstack/react-query";
import { Button, Modal, Table, TableProps } from "antd";
import { FC, useState } from "react";
import { constantChallengeManagerQueryKey } from "../../../../constants/queryKey/challengeManager";
import { ITaskSolutionEntity } from "../../../../types/entity/solution";
import challengeManagerService from "../../../../service/ChallengeManager/challengeManagerService";
import columnsTaskSolution from "./TaskSolutionModal.config";
import { useNavigate } from "react-router";
import constantRoutesChallengeManager from "../../../../constants/routes/challengeManager";

interface ITaskSolutionModalProps {
  taskId: string;
  isShow: boolean;
  handleChangeShow: (state: boolean) => void;
}

const TaskSolutionModal: FC<ITaskSolutionModalProps> = ({
  isShow,
  taskId,
  handleChangeShow,
}) => {
  const [currentPage, setCurrentPage] = useState<number | string>(1);
  const [pageSize, setPageSize] = useState<number | string>(10);
  const [taskSolutions, setTaskSolutions] = useState<ITaskSolutionEntity[]>([]);
  const [totalPage, setTotalPage] = useState<string | number>(0);
  const navigate = useNavigate();

  const { isFetching } = useQuery({
    queryKey: [
      taskId,
      currentPage,
      pageSize,
      constantChallengeManagerQueryKey.taskSolution.getAll,
    ],
    queryFn: async () => {
      const response = await challengeManagerService.taskSolution.getByIdTask({
        page: currentPage,
        perPage: pageSize,
        taskId: taskId,
      });
      const responseData = response.data;
      setTaskSolutions(responseData.solutions);
      setTotalPage(responseData.total);
      return responseData;
    },
  });

  const handleChangeTable: TableProps<ITaskSolutionEntity>["onChange"] = (
    pagination,
  ) => {
    if (pagination.current && pagination.current !== currentPage) {
      setCurrentPage(pagination.current);
    }

    if (pagination.showSizeChanger && pagination.pageSize) {
      setPageSize(pagination.pageSize);
    }
  };

  const actionsColumnn: TableProps<ITaskSolutionEntity>["columns"] = [
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() =>
            navigate(
              `${constantRoutesChallengeManager.pages.tasks.taskSolutionDetails}/${record.id}`,
            )
          }
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <Modal
      width={1000}
      open={isShow}
      title="Danh sách giải pháp"
      onCancel={() => handleChangeShow(false)}
      footer={() => (
        <Button variant="solid" onClick={() => handleChangeShow(false)}>
          Hủy
        </Button>
      )}
    >
      <Table
        scroll={{ x: "max-content" }}
        loading={isFetching}
        columns={[...(columnsTaskSolution || []), ...actionsColumnn]}
        dataSource={taskSolutions}
        pagination={{
          pageSize: pageSize as number,
          current: currentPage as number,
          total: totalPage as number,
        }}
        onChange={handleChangeTable}
      />
    </Modal>
  );
};

export default TaskSolutionModal;
