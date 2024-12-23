import { Button, Empty, Table, TableProps } from "antd";
import { ISolutionEntity } from "../../../../../../types/entity/solution";
import constantRoutesChallengeManager from "../../../../../../constants/routes/challengeManager";
import { useNavigate } from "react-router";
import columnsSolutionList from "./TableSolutionOfChallenge.config";
import { useQuery } from "@tanstack/react-query";
import { constantChallengeManagerQueryKey } from "../../../../../../constants/queryKey/challengeManager";
import { FC, useState } from "react";
import challengeManagerService from "../../../../../../service/ChallengeManager/challengeManagerService";

interface ITableSolutionOfChallenge {
  challengeId: string;
}

const TableSolutionOfChallenge: FC<ITableSolutionOfChallenge> = ({
  challengeId,
}) => {
  const [currentPage, setCurrentPage] = useState<number | string>(1);
  const [pageSize, setPageSize] = useState<number | string>(10);
  const [totalPage, setTotalPage] = useState<number | string>(0);
  const [solutionofChallenges, setSolutionOfChallenges] = useState<
    ISolutionEntity[]
  >([]);
  const navigate = useNavigate();

  const { isFetching } = useQuery({
    queryKey: [
      constantChallengeManagerQueryKey.soltuion.allByChallengeId,
      pageSize,
      currentPage,
    ],
    queryFn: async () => {
      const response =
        await challengeManagerService.solution.getAllByChallengeId({
          challengeId: challengeId,
        });
      const responseData = response.data;
      setSolutionOfChallenges(responseData.solutions);
      setPageSize(responseData.per_page);
      setCurrentPage(responseData.current_page);
      setTotalPage(responseData.total);

      return responseData;
    },
  });

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
                `/${constantRoutesChallengeManager.pages.solutions.root}/${constantRoutesChallengeManager.pages.solutions.details}/${record.id}`,
              )
            }
          >
            Xem chi tiết
          </Button>
        );
      },
    },
  ];

  const onChangeTable: TableProps<ISolutionEntity>["onChange"] = (
    pagination,
  ) => {
    if (pagination.current !== currentPage && pagination.current) {
      const page = pagination.current.toString();
      setCurrentPage(page);
    }

    if (
      pagination.pageSize !== pageSize &&
      pagination.showSizeChanger &&
      pagination.pageSize
    ) {
      const limit = pagination.pageSize.toString();
      setPageSize(limit);
    }
  };

  return (
    <Table
      columns={[...(columnsSolutionList || []), ...actionsColumn]}
      scroll={{ x: "max-content" }}
      dataSource={solutionofChallenges}
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
            description={"Không tìm thấy giải pháp nào của thử thách này..."}
          ></Empty>
        ),
      }}
    />
  );
};

export default TableSolutionOfChallenge;
