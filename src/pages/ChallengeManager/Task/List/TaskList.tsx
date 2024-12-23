import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import challengeManagerService from "../../../../service/ChallengeManager/challengeManagerService";
import { ITaskEntity } from "../../../../types/entity/task";
import { Button, Flex, Table, TableProps, Typography } from "antd";
import columnsTaskTable from "./TaskList.config";
import { RedoOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { constantChallengeManagerQueryKey } from "../../../../constants/queryKey/challengeManager";
import { toast } from "react-toastify";

const { Title } = Typography;

const TaskListPage: FC = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<string | number>(
    searchParams.get("page") || 1,
  );
  const [pageSize, setPageSize] = useState<string | number>(
    searchParams.get("limit") || 10,
  );
  const [taskList, setTaskList] = useState<ITaskEntity[]>([]);
  const [totalPage, setTotalPage] = useState<string | number>(0);
  const { isFetching } = useQuery({
    queryKey: [
      constantChallengeManagerQueryKey.task.getAll,
      currentPage,
      pageSize,
    ],
    queryFn: async () => {
      const response = await challengeManagerService.task.getAll({
        page: currentPage,
        per_page: pageSize,
      });

      const responseData = response.data;
      setTaskList(responseData.tasks);
      setTotalPage(responseData.total);
      return responseData;
    },
  });

  console.log("render ");

  const handleChangeTable: TableProps<ITaskEntity>["onChange"] = (
    pagination,
  ) => {
    if (pagination.current && pagination.current !== currentPage) {
      const page = pagination.current.toString();
      const currentParams = Object.fromEntries(searchParams.entries());
      setSearchParams({ ...currentParams, page: page });
      setCurrentPage(page);
    }

    if (pagination.showSizeChanger && pagination.pageSize) {
      const limit = pagination.pageSize.toString();
      const currentParams = Object.fromEntries(searchParams.entries());
      setSearchParams({ ...currentParams, limit: limit });
      setPageSize(pagination.pageSize);
    }
  };

  const handleRefreshData = async () => {
    return await toast.promise(
      queryClient.refetchQueries({
        queryKey: [constantChallengeManagerQueryKey.task.getAll],
      }),
      {
        pending: "Đang thực hiện làm mới dữ liệu",
        success: "Làm mới dữ liệu thành công",
        error: "Làm mới dữ liệu thất bại",
      },
    );
  };

  return (
    <Flex vertical gap={32}>
      <Flex
        justify="space-between"
        align="center"
        style={{
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div>
          <Title level={3} style={{ margin: "0" }}>
            Danh sách nhiệm vụ
          </Title>
        </div>
        <div>
          <Flex justify="flex-end" align="stretch" gap={12}>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              icon={<RedoOutlined />}
              onClick={() => handleRefreshData()}
            >
              Làm mới
            </Button>

            {/* <Button */}
            {/*   color="primary" */}
            {/*   size="large" */}
            {/*   icon={<FilterOutlined />} */}
            {/*   disabled */}
            {/*   // onClick={() => openDrawerFilter()} */}
            {/* > */}
            {/*   Bộ lọc */}
            {/* </Button> */}
          </Flex>
        </div>
      </Flex>
      <Table
        rowKey={(record) => `${record.id}`}
        loading={isFetching}
        dataSource={taskList}
        columns={columnsTaskTable}
        pagination={{
          pageSize: pageSize as number,
          current: currentPage as number,
          total: totalPage as number,
          showSizeChanger: true,
        }}
        onChange={handleChangeTable}
        scroll={{ x: "max-content" }}
        showHeader
        sticky
        virtual
      />
    </Flex>
  );
};

export default TaskListPage;
