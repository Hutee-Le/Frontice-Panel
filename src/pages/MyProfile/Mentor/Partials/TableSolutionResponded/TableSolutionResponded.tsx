import { Table, Empty, TableProps, Button } from "antd";
import columnsSolutionsResponded from "./tableSolutionResponded.config";
import { useState } from "react";
import { ISolutionFeedbackRespondedEntity } from "../../../../../types/entity/solution";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import constantRoutesMentor from "../../../../../constants/routes/mentor";
import { useQuery } from "@tanstack/react-query";
import { mentorQueryKey } from "../../../../../constants/queryKey/mentor";
import mentorService from "../../../../../service/Mentor/mentorService";
import useSolutionStore from "../../../../../store/Solution/solutionStore";
import useAuthStore from "../../../../../store/Auth/authStore";

const TableSolutionResponded = () => {
  const [currentPage, setCurrentPage] = useState<string | number>(1);
  const [pageSize, setPageSize] = useState<string | number>(10);
  const [totalPage, setTotalPage] = useState<string | number>(1);
  const accountId = useAuthStore((state) => state.profile?.id);
  const changeSolutionRespondedLength = useSolutionStore(
    (state) => state.changeSolutionCount,
  );
  const [solutionResponded, setSolutionResponded] = useState<
    ISolutionFeedbackRespondedEntity[]
  >([]);

  const columns = columnsSolutionsResponded;

  const { isFetching } = useQuery({
    queryKey: [
      mentorQueryKey.solution.getAllResponded,
      "my-responded",
      accountId,
    ],
    queryFn: async () => {
      try {
        const response = await mentorService.solution.responded({
          page: currentPage,
          per_page: pageSize,
        });
        const responseData = response.data;

        setSolutionResponded(responseData.solutions);
        setTotalPage(responseData.total);
        changeSolutionRespondedLength(responseData.total);
        return responseData;
      } catch (error) {
        console.log("[ERROR GET RESPONDED FEEDBACK]: ", error);
      }
    },
  });

  const onChangeTable: TableProps<ISolutionFeedbackRespondedEntity>["onChange"] =
    (pagination) => {
      if (pagination?.current && pagination.current !== currentPage) {
        const currentPageNow = pagination.current;
        setCurrentPage(currentPageNow);
      }

      if (
        pagination?.showSizeChanger &&
        pagination?.pageSize &&
        pagination.pageSize !== pageSize
      ) {
        const pageSizeNow = pagination.pageSize;
        setPageSize(pageSizeNow);
      }
    };

  return (
    <Table
      columns={columns}
      scroll={{ x: "max-content" }}
      virtual
      showHeader
      sticky
      dataSource={solutionResponded}
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
          <Empty description={"Bạn chưa phản hồi giải pháp nào..."}>
            <Button size="large" icon={<PlusOutlined />}>
              <Link
                to={`/${constantRoutesMentor.solution.root}/${constantRoutesMentor.solution.list}`}
              >
                Phản hồi thử thách
              </Link>
            </Button>
          </Empty>
        ),
      }}
    />
  );
};

export default TableSolutionResponded;
