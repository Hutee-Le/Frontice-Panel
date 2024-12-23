import { Button, Empty, Table, TableProps } from "antd";
import { useState } from "react";
import IDataTypeChallengeList from "../tables.type";
import challengeListColumn from "../tables.config";
import { useQuery } from "@tanstack/react-query";
import { IGetAllChallengeParams } from "../../../../../../types/request/challenge";
import challengeManagerService from "../../../../../../service/ChallengeManager/challengeManagerService";
import { Link, useSearchParams } from "react-router-dom";
import constantRoutesChallengeManager from "../../../../../../constants/routes/challengeManager";
import { PlusOutlined } from "@ant-design/icons";
import generateQueryKeyChallenges from "../../challengeList.utils";
import { constantChallengeManagerQueryKey } from "../../../../../../constants/queryKey/challengeManager";
import { ActionChallenge } from "../Partials/ActionChallenge";

const DEFAULT_CUREENT_PAGE: number = 1;
const DEFAULT_PAGE_SIZE: number = 10;

const typeChallenge: IGetAllChallengeParams["get"] = "owner";
const MyChallengesTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number | string>(
    searchParams.get("page") || DEFAULT_CUREENT_PAGE,
  );
  const [pageSize, setPageSize] = useState<number | string>(
    searchParams.get("litmit") || DEFAULT_PAGE_SIZE,
  );
  const [challengesList, setChallengesList] = useState<
    IDataTypeChallengeList[]
  >([]);
  const [total, setTotal] = useState<number>(0);
  const columns = challengeListColumn || [];

  const queryKeys = generateQueryKeyChallenges(
    constantChallengeManagerQueryKey.challenge.myChallenges,
    {
      page: currentPage,
      perPage: pageSize,
      get: typeChallenge,
    },
  );

  const { isFetching } = useQuery({
    queryKey: [...queryKeys, { ...Object.fromEntries(searchParams.entries()) }],
    queryFn: async () => {
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

      const params: IGetAllChallengeParams = {
        page: currentPage,
        perPage: pageSize,
        get: typeChallenge,
        filter: filters,
      };
      try {
        const response = await challengeManagerService.challenge.getAll(params);
        const {
          challenges = [],
          total = 0,
          currentPage = 1,
          perPage = 10,
        } = response.data;
        setChallengesList(challenges);
        setPageSize(perPage);
        setCurrentPage(currentPage);
        setTotal(total);

        return response.data;
      } catch (error) {
        setChallengesList([]);
        console.log("Error: ", error);
      }
    },
  });

  const handleChangeTable: TableProps<IDataTypeChallengeList>["onChange"] = (
    pagination,
  ) => {
    if (pagination.current && pagination.current !== currentPage) {
      const page = pagination.current.toString();
      const currentParams = Object.fromEntries(searchParams.entries());
      setCurrentPage(page || DEFAULT_CUREENT_PAGE);
      setSearchParams({ ...currentParams, page: page });
    }

    if (
      pagination.showSizeChanger &&
      pagination.pageSize &&
      pagination.pageSize !== pageSize
    ) {
      const pageSize = pagination.pageSize.toString();
      const currentParams = Object.fromEntries(searchParams.entries());
      setPageSize(pageSize || DEFAULT_PAGE_SIZE);
      setSearchParams({ ...currentParams, limit: pageSize });
    }
  };

  const buttonCreateChallenge = (
    <Button size="large" icon={<PlusOutlined />}>
      <Link to={constantRoutesChallengeManager.pages.challenges.create}>
        Tạo thử thách
      </Link>
    </Button>
  );

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

  return (
    <Table<IDataTypeChallengeList>
      loading={isFetching}
      rowKey={(record) => `${record.id}`}
      scroll={{ x: "max-content" }}
      columns={[...columns, ...actionColumns]}
      dataSource={challengesList}
      pagination={{
        pageSize: pageSize as number,
        current: currentPage as number,
        total: total,
        showSizeChanger: true,
      }}
      virtual
      showHeader
      sticky
      onChange={handleChangeTable}
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

export default MyChallengesTable;
