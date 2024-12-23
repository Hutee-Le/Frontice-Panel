import { useQuery } from "@tanstack/react-query";
import challengeManagerService from "../../../../service/ChallengeManager/challengeManagerService";
import { Button, TableProps, Table, Flex, Typography, Empty } from "antd";
import { useNavigate } from "react-router";
import { ISolutionEntity } from "../../../../types/entity/solution";
import constantRoutesChallengeManager from "../../../../constants/routes/challengeManager";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import columnsSolutionReportList from "./SolutionReportList.config";
import { FilterOutlined, RedoOutlined } from "@ant-design/icons";

const { Title } = Typography;

const SolutionsReportsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [solutionReportList, setSolutionReportList] = useState<
    ISolutionEntity[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number | string>(
    searchParams.get("page") || 1,
  );
  const [pageSize, setPageSize] = useState<number | string>(
    searchParams.get("limit") || 10,
  );

  const [totalPage, setTotalPage] = useState<number | string>(0);

  const navigate = useNavigate();

  const { isFetching } = useQuery({
    queryKey: [],
    queryFn: async () => {
      try {
        const response = await challengeManagerService.solution.getReport();
        const responseData = response.data;
        setSolutionReportList(responseData.solutions);
        setCurrentPage(responseData.currentPage);
        setPageSize(responseData.perPage);
        setTotalPage(responseData.total);
        return responseData;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onChangeTable: TableProps<ISolutionEntity>["onChange"] = (
    pagination,
  ) => {
    if (pagination.current !== currentPage && pagination.current) {
      const page = pagination.current.toString();
      const currentParams = Object.fromEntries(searchParams.entries());
      setCurrentPage(page);
      setSearchParams({ ...currentParams, page: page });
    }

    if (
      pagination.pageSize !== pageSize &&
      pagination.showSizeChanger &&
      pagination.pageSize
    ) {
      const limit = pagination.pageSize.toString();
      const currentParams = Object.fromEntries(searchParams.entries());
      setPageSize(pagination?.pageSize as number);
      setSearchParams({ ...currentParams, limit: limit });
    }
  };

  const actionsColumn: TableProps<ISolutionEntity>["columns"] = [
    {
      fixed: "right",
      title: "Hành động",
      key: "actions",
      render: (_, record) => {
        return (
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() =>
              navigate(
                `${constantRoutesChallengeManager.pages.solutions.details}/${record.id}`,
              )
            }
          >
            Xem chi tiết
          </Button>
        );
      },
    },
  ];

  return (
    <Flex gap={32} vertical>
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
          <Title level={4} style={{ margin: "0" }}>
            Danh sách giải pháp của{" "}
            <span style={{ color: "#5250F7" }}>Taskee</span>{" "}
            <span style={{ color: "#EA5B33" }}>Bị tố cáo</span>
          </Title>
        </div>
        <div>
          <Flex justify="flex-end" align="stretch" gap={12}>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              disabled
              icon={<RedoOutlined />}
              // onClick={() => revalidateChallenges()}
              // loading={isLoadingRefreshChallengebutton}
            >
              Làm mới
            </Button>

            <Button
              color="primary"
              size="large"
              disabled
              icon={<FilterOutlined />}
              // onClick={() => openDrawerFilter()}
            >
              Bộ lọc
            </Button>
          </Flex>
        </div>
      </Flex>
      <Table
        columns={[...(columnsSolutionReportList || []), ...actionsColumn]}
        scroll={{ x: "max-content" }}
        dataSource={solutionReportList}
        loading={isFetching}
        pagination={{
          pageSize: pageSize as number,
          total: totalPage as number,
          current: currentPage as number,
          showSizeChanger: true,
        }}
        onChange={onChangeTable}
        locale={{
          emptyText: (
            <Empty
              description={"Không tìm thấy giải pháp nào bị tố cáo..."}
            ></Empty>
          ),
        }}
      />
    </Flex>
  );
};

export default SolutionsReportsPage;
