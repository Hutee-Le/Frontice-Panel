import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import challengeManagerService from "../../../../service/ChallengeManager/challengeManagerService";
import { useSearchParams } from "react-router-dom";
import { IGetAllTaskReportResponse } from "../../../../types/response/task";
import { Button, Flex, Table, TableProps, Typography } from "antd";
import { FilterOutlined, RedoOutlined } from "@ant-design/icons";
import columnsTaskReportTable from "./TaskReports.config";

const { Title } = Typography;

const TaskReportsPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<string | number>(
    searchParams.get("page") || 1,
  );
  const [pageSize, setPageSize] = useState<string | number>(
    searchParams.get("limit") || 10,
  );

  const [taskReports, setTaskReports] = useState<
    IGetAllTaskReportResponse["tasks"]
  >([]);

  const [totalPage, setTotalPage] = useState<string | number>(0);

  const { isFetching } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const response = await challengeManagerService.task.getAllReports({
        page: currentPage,
        per_page: pageSize,
      });

      const responseData = response.data;
      setTaskReports(responseData.tasks);
      setTotalPage(responseData.total);
    },
  });

  const handleChangeTable: TableProps["onChange"] = (pagination) => {
    if (pagination?.current && pagination?.current !== currentPage) {
      const currentSearchParams = Object.fromEntries(searchParams.entries());
      const pageNow = pagination?.current.toString();
      setCurrentPage(pageNow);
      setSearchParams({ ...currentSearchParams, page: pageNow });
    }

    if (
      pagination.showSizeChanger &&
      pagination?.pageSize &&
      pagination?.pageSize !== pageSize
    ) {
      const currentSearchParams = Object.fromEntries(searchParams.entries());
      const pageSizeNow = pagination?.pageSize.toString();
      setPageSize(pageSizeNow);
      setSearchParams({ ...currentSearchParams, limit: pageSizeNow });
    }
  };

  const columns = columnsTaskReportTable;
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
            Danh sách nhiệm vụ bị <span style={{ color: "red" }}>tố cáo</span>
          </Title>
        </div>
        <div>
          <Flex justify="flex-end" align="stretch" gap={12}>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              icon={<RedoOutlined />}
              disabled
              // onClick={() => revalidateChallenges()}
              // loading={isLoadingRefreshChallengebutton}
            >
              Làm mới
            </Button>

            <Button
              color="primary"
              size="large"
              icon={<FilterOutlined />}
              disabled
              // onClick={() => openDrawerFilter()}
            >
              Bộ lọc
            </Button>
          </Flex>
        </div>
      </Flex>
      <Table
        rowKey={(record) => `${record.id}`}
        loading={isFetching}
        dataSource={taskReports}
        columns={columns}
        pagination={{
          pageSize: pageSize as number,
          current: currentPage as number,
          total: totalPage as number,
          showSizeChanger: true,
        }}
        // onChange={handleChangeTable}
        scroll={{ x: "max-content" }}
        showHeader
        sticky
        virtual
        onChange={handleChangeTable as any}
      />
    </Flex>
  );
};

export default TaskReportsPage;
