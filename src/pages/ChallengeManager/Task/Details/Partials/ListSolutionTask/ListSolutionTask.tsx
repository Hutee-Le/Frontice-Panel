import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import challengeManagerService from "../../../../../../service/ChallengeManager/challengeManagerService";
import { ITaskSolutionEntity } from "../../../../../../types/entity/solution";
import { constantChallengeManagerQueryKey } from "../../../../../../constants/queryKey/challengeManager";
import { Empty, Table, TableProps } from "antd";
import columnsTaskSolutionList from "./listSolutionTask.config";

interface IListSolutionTaskProps {
  taskId: string;
}

const ListSolutionTask: FC<IListSolutionTaskProps> = ({ taskId }) => {
  const [currentPage, setCurrentPage] = useState<number | string>(1);
  const [pageSize, setPageSize] = useState<number | string>(10);
  const [totalPage, setTotalPage] = useState<number | string>(0);
  const [listSolutionTask, setListSolutionTask] = useState<
    ITaskSolutionEntity[]
  >([]);

  const { isFetching } = useQuery({
    queryKey: [
      constantChallengeManagerQueryKey.taskSolution.getByTaskId,
      taskId,
      currentPage,
      pageSize,
    ],
    queryFn: async () => {
      try {
        const response = await challengeManagerService.taskSolution.getByIdTask(
          { taskId },
        );
        const responseData = response.data;
        setListSolutionTask(responseData.solutions);
        setTotalPage(responseData.total);
        return responseData;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleChangeTable: TableProps<ITaskSolutionEntity>["onChange"] = (
    pagination,
  ) => {
    if (pagination.current && pagination.current !== currentPage) {
      setCurrentPage(pagination.current);
    }

    if (
      pagination.showSizeChanger &&
      pagination.pageSize !== pageSize &&
      pagination.pageSize
    ) {
      setPageSize(pagination.pageSize);
    }
  };

  return (
    <Table
      loading={isFetching}
      dataSource={listSolutionTask}
      columns={columnsTaskSolutionList}
      pagination={{
        pageSize: pageSize as number,
        current: currentPage as number,
        total: totalPage as number,
        showSizeChanger: true,
      }}
      showHeader
      sticky
      virtual
      scroll={{ x: "max-content" }}
      onChange={handleChangeTable}
      locale={{
        emptyText: <Empty description={"Không tìm thấy giải pháp nào..."} />,
      }}
    />
  );
};

export default ListSolutionTask;
