import { useQuery, useQueryClient } from "@tanstack/react-query";
import constantRootQueryKeys from "../../../../constants/queryKey/root";
import rootService from "../../../../service/Root/RootService";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IUserTaskeeEntity } from "../../../../types/response/root/user";
import { Button, Empty, Flex, Table, TableProps, Typography } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { columnsTaskeeTable } from "./taskeeUser.config";

const { Title } = Typography;

const TaskeeUserPage = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<string | number>(
    searchParams.get("page") || 1,
  );
  const [pageSize, setPageSize] = useState<string | number>(
    searchParams.get("limit") || 10,
  );
  const [totalTaskee, setTotalTaskee] = useState<string | number>(0);
  const [taskees, setTaskees] = useState<IUserTaskeeEntity[]>([]);

  const { isFetching } = useQuery({
    queryKey: [
      constantRootQueryKeys.user.getAllUserByRole,
      "taskees",
      currentPage,
      pageSize,
    ],
    queryFn: async () => {
      try {
        const response = await rootService.user.getAllUserTaskee({
          page: currentPage,
          pageSize,
        });

        const responseData = response.data;
        setTaskees(responseData.taskee);
        setTotalTaskee(responseData.total);
      } catch (error) {
        console.log("error: ", error);
      }
    },
  });
  const handleChangeTable: TableProps<IUserTaskeeEntity>["onChange"] = (
    paginations,
  ) => {
    if (paginations?.current && paginations.current !== currentPage) {
      const currentPageNow = paginations.current.toString();
      const currentSearchParams = Object.fromEntries(searchParams.entries());
      setCurrentPage(currentPageNow);
      setSearchParams({ ...currentSearchParams, page: currentPageNow });
    }

    if (
      paginations.showSizeChanger &&
      paginations.pageSize &&
      paginations.pageSize !== pageSize
    ) {
      const currentPageSize = paginations.pageSize.toString();
      const currentSearchParams = Object.fromEntries(searchParams.entries());
      setPageSize(currentPageSize);
      setSearchParams({ ...currentSearchParams, limit: currentPageSize });
    }
  };

  const prefetchData = () => {
    queryClient.refetchQueries({
      queryKey: [constantRootQueryKeys.user.getAllUserByRole, "taskees"],
    });
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
            Danh sách tài khoản người dùng
          </Title>
        </div>
        <div>
          <Flex justify="flex-end" align="stretch" gap={12}>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              icon={<RedoOutlined />}
              onClick={prefetchData}
            >
              Làm mới
            </Button>
          </Flex>
        </div>
      </Flex>

      <Table<IUserTaskeeEntity>
        rowKey={(record) => `${record.id}`}
        dataSource={taskees}
        scroll={{ x: "max-content" }}
        loading={isFetching}
        columns={columnsTaskeeTable}
        pagination={{
          pageSize: pageSize as number,
          current: currentPage as number,
          total: totalTaskee as number,
          showSizeChanger: true,
        }}
        sticky
        virtual
        showHeader
        onChange={handleChangeTable}
        locale={{
          emptyText: (
            <Empty
              description={"Không tìm thấy tài khoản người dùng nào nào..."}
            >
              <Button variant="outlined" color="primary">
                Tạo tài khoản nhân viên ngay
              </Button>
            </Empty>
          ),
        }}
      />
    </Flex>
  );
};

export default TaskeeUserPage;
