import { FC, useState } from "react";
import { Button, Empty, Flex, Table, TableProps, Typography } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import constantRoutesChallengeManager from "../../../../constants/routes/challengeManager";
import columnsSolutionList from "./SolutionList.config";
import { ISolutionEntity } from "../../../../types/entity/solution";
import { RedoOutlined } from "@ant-design/icons";
import challengeManagerService from "../../../../service/ChallengeManager/challengeManagerService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type DataType = ISolutionEntity;

const { Title } = Typography;

const SolutionListPage: FC = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPage, setTotalPage] = useState<number | string>(0);
  const [currentPage, setCurrentPage] = useState<number | string>(
    searchParams.get("page") || 1,
  );
  const [perPage, setPerPage] = useState<number | string>(
    searchParams.get("limit") || 10,
  );
  const [solutionList, setSolutionList] = useState<DataType[]>([]);
  const navigate = useNavigate();

  const { isFetching, data } = useQuery({
    queryKey: ["solution_list", perPage, currentPage],
    queryFn: async () => {
      const response = await challengeManagerService.solution.getAll({
        page: currentPage,
        per_page: perPage,
      });

      setTotalPage(response.data.total);
      setSolutionList(response.data.solutions);
      return response.data;
    },
  });

  const onChangeTable: TableProps<DataType>["onChange"] = (pagination) => {
    if (pagination.current !== currentPage && pagination.current) {
      const page = pagination.current.toString();
      const currentParams = Object.fromEntries(searchParams.entries());
      setCurrentPage(page);
      setSearchParams({ ...currentParams, page: page });
    }

    if (
      pagination.pageSize !== perPage &&
      pagination.showSizeChanger &&
      pagination.pageSize
    ) {
      const limit = pagination.pageSize.toString();
      const currentParams = Object.fromEntries(searchParams.entries());
      setPerPage(pagination?.pageSize as number);
      setSearchParams({ ...currentParams, limit: limit });
    }
  };

  const actionsColumn: TableProps<DataType>["columns"] = [
    {
      fixed: "right",
      width: 240,
      title: "Hành động",
      key: "actions",
      render: (_, record) => {
        return (
          <Button
            variant="outlined"
            color="primary"
            size="middle"
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

  const handleRefreshData = async () => {
    return await toast.promise(
      queryClient.refetchQueries({
        queryKey: ["solution_list"],
      }),
      {
        pending: "Đang thực hiện làm mới dữ liệu",
        error: "Làm mới dữ liệu thất bại",
        success: "Làm mới dự liệu thành công",
      },
    );
  };

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
          <Title level={3} style={{ margin: "0" }}>
            Danh sách giải pháp của{" "}
            <span style={{ color: "#5250F7" }}>Taskee</span>
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
            {/*   disabled */}
            {/*   icon={<FilterOutlined />} */}
            {/*   // onClick={() => openDrawerFilter()} */}
            {/* > */}
            {/*   Bộ lọc */}
            {/* </Button> */}
          </Flex>
        </div>
      </Flex>
      <Table
        columns={[...(columnsSolutionList || []), ...actionsColumn]}
        scroll={{ x: "max-content" }}
        virtual
        showHeader
        sticky
        dataSource={solutionList}
        loading={isFetching}
        pagination={{
          pageSize: data?.perPage,
          total: totalPage as number,
          current: currentPage as number,
          showSizeChanger: true,
        }}
        onChange={onChangeTable}
        locale={{
          emptyText: (
            <Empty description={"Không tìm thấy giải pháp nào..."}></Empty>
          ),
        }}
      />
    </Flex>
  );
};

export default SolutionListPage;
