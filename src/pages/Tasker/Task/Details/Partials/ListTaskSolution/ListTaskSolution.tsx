import { Empty, Table, TableProps } from "antd";
import columnsTaskSolutionList from "./listTaskSolution.config";
import { useQuery } from "@tanstack/react-query";
import taskerQueryKeys from "../../../../../../constants/queryKey/tasker/taskerQueryKey";
import { FC, useState } from "react";
import taskerService from "../../../../../../service/Tasker/taskerService";
import { ITaskSolutionEntity } from "../../../../../../types/entity/taskSolution";

type IListTaskSolutionProps = {
  taskId: string;
};

const ListTaskSolution: FC<IListTaskSolutionProps> = ({ taskId }) => {
  const [currentPage, setCurrentPage] = useState<string | number>(1);
  const [pageSize, setPageSize] = useState<string | number>(10);
  const [totalPage, setTotalPage] = useState<string | number>(0);
  const [taskSolutionList, setTaskSolutionList] = useState<
    ITaskSolutionEntity[]
  >([]);
  const { isFetching } = useQuery({
    queryKey: [
      taskerQueryKeys.taskSolution.getAllByTaskId,
      taskId,
      pageSize,
      currentPage,
    ],
    queryFn: async () => {
      try {
        const response = await taskerService.taskSolution.getAllByTaskId({
          taskId: taskId,
          pageSize: pageSize,
          page: currentPage,
        });

        const responseData = response.data;
        setTotalPage(responseData.total);
        setTaskSolutionList(responseData.solutions);
        return responseData;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleChangeTable: TableProps<ITaskSolutionEntity>["onChange"] = (
    pagination,
  ) => {
    if (pagination?.current && pagination.current !== currentPage) {
      setCurrentPage(pagination.current);
    }

    if (
      pagination?.showSizeChanger &&
      pagination.pageSize &&
      pagination.pageSize !== pageSize
    ) {
      setPageSize(pagination.pageSize);
    }
  };
  return (
    <Table
      loading={isFetching}
      dataSource={taskSolutionList}
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
        emptyText: <Empty description="Không tìm thấy giải pháp..." />,
      }}
    />
  );
};

export default ListTaskSolution;
