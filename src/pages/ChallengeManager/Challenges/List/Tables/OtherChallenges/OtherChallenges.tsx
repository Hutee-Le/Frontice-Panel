import { Button, Empty, Table, TableProps } from "antd";
import { FC, useState } from "react";
import IDataTypeChallengeList from "../tables.type";
import challengeListColumn from "../tables.config";
import { useQuery } from "@tanstack/react-query";
import { IGetAllChallengeParams } from "../../../../../../types/request/challenge";
import challengeManagerService from "../../../../../../service/ChallengeManager/challengeManagerService";
import generateQueryKeyChallenges from "../../challengeList.utils";
import { constantChallengeManagerQueryKey } from "../../../../../../constants/queryKey/challengeManager";
import { useSearchParams } from "react-router-dom";
import constantRoutesChallengeManager from "../../../../../../constants/routes/challengeManager";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ActionChallenge } from "../Partials/ActionChallenge";

const DEFAULT_CUREENT_PAGE: number = 1;
const DEFAULT_PAGE_SIZE: number = 10;

const typeChallenges: IGetAllChallengeParams["get"] = "other";

const OtherChallengesTable: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number | string>(
    searchParams.get("page") || 1,
  );
  const [pageSize, setPageSize] = useState<number | string>(
    searchParams.get("limit") || 10,
  );
  const [total, setTotal] = useState<number>(0);
  const [challenges, setChallenges] = useState<IDataTypeChallengeList[]>([]);
  const columns = challengeListColumn || [];
  const queryKeys = generateQueryKeyChallenges(
    constantChallengeManagerQueryKey.challenge.otherChallenges,
    {
      page: currentPage,
      perPage: pageSize,
      get: typeChallenges,
    },
  );
  const { isFetching } = useQuery({
    queryKey: [...queryKeys, { ...Object.fromEntries(searchParams.entries()) }],
    queryFn: async () => {
      try {
        const searchParamsEntries = Object.fromEntries(searchParams.entries());
        const filters: IGetAllChallengeParams["filter"] = {};
        if (searchParamsEntries["levels"]) {
          filters.levels = searchParamsEntries["levels"].split("-");
        }

        if (searchParamsEntries["timeCreated"]) {
          filters.timeCreated = searchParamsEntries["timeCreated"].split("-");
        }

        if (searchParamsEntries["technical"]) {
          filters.technical = searchParamsEntries["technical"].split("-");
        }

        if (searchParamsEntries["owners"]) {
          filters.owners = searchParamsEntries["owners"].split("%%");
        }

        if (searchParamsEntries["points"]) {
          filters.points = searchParamsEntries["points"].split("-");
        }

        if (searchParamsEntries["premium"]) {
          filters.premium = true;
        }

        const response = await challengeManagerService.challenge.getAll({
          page: currentPage,
          perPage: pageSize,
          get: typeChallenges,
          filter: filters,
        });

        const {
          challenges: challengesResponse = [],
          total: totalResponse = 0,
          currentPage: currentPageResponse = 1,
          perPage: perPageResponse = 10,
        } = response.data;

        setPageSize(perPageResponse);
        setCurrentPage(currentPageResponse);
        setTotal(totalResponse);
        setChallenges(challengesResponse);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleChangeTable: TableProps<IDataTypeChallengeList>["onChange"] = (
    pagination,
  ) => {
    if (pagination.current !== currentPage && pagination.current) {
      const page = pagination.current.toString();
      const currentParams = Object.fromEntries(searchParams.entries());
      setCurrentPage(pagination.current || DEFAULT_CUREENT_PAGE);
      setSearchParams({ ...currentParams, page: page });
    }

    if (
      pagination.showSizeChanger &&
      pagination.pageSize !== pageSize &&
      pagination.pageSize
    ) {
      const limit = pagination.pageSize.toString();
      const currentParams = Object.fromEntries(searchParams.entries());
      setPageSize(pagination.pageSize || DEFAULT_PAGE_SIZE);
      setSearchParams({ ...currentParams, limit });
    }
  };

  const actionColumns: TableProps<IDataTypeChallengeList>["columns"] = [
    {
      width: 200,
      title: "Hành động",
      fixed: "right",
      key: "actions",
      render: (_, record: IDataTypeChallengeList) => (
        <ActionChallenge challenge={record} />
      ),
    },
  ];

  const buttonCreateChallenge = (
    <Button size="large" icon={<PlusOutlined />}>
      <Link to={constantRoutesChallengeManager.pages.challenges.create}>
        Tạo thử thách
      </Link>
    </Button>
  );

  return (
    <Table<IDataTypeChallengeList>
      loading={isFetching}
      columns={[...columns, ...actionColumns]}
      rowKey={(record) => `${record.id}`}
      dataSource={challenges}
      onChange={handleChangeTable}
      pagination={{
        current: currentPage as number,
        total: total,
        pageSize: pageSize as number,
        showSizeChanger: true,
      }}
      showHeader
      sticky
      virtual
      scroll={{ x: "max-content" }}
      locale={{
        emptyText: (
          <Empty description={"Không tìm thấy thử thách..."}>
            {buttonCreateChallenge}
          </Empty>
        ),
      }}
    />
  );
};

export default OtherChallengesTable;
