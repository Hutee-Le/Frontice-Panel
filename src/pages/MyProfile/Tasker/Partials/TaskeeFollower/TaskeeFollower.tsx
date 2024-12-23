import { useQuery } from "@tanstack/react-query";
import taskerQueryKeys from "../../../../../constants/queryKey/tasker/taskerQueryKey";
import { useState } from "react";
import taskerService from "../../../../../service/Tasker/taskerService";
import { Card, Col, Flex, Pagination, Row, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import { PaginationProps } from "rc-pagination";
import { useNavigate } from "react-router";
import constantRoutesGlobal from "../../../../../constants/routes/global";

const TaskeeFollower = () => {
  const [currentPage, setCurrentPage] = useState<string | number>(1);
  const [totalFollower, setTotalFollower] = useState<string | number>(0);
  const [pageSize, setPageSize] = useState<string | number>(10);
  const navigate = useNavigate();
  const { data, isFetching } = useQuery({
    queryKey: [taskerQueryKeys.follower.getAll, currentPage, pageSize],
    queryFn: async () => {
      try {
        const response = await taskerService.follower.getAll({
          page: currentPage as string,
          per_page: pageSize as string,
        });
        const responseData = response.data;
        setTotalFollower(responseData.total);
        return responseData;
      } catch (error) {
        console.log("[ERROR FOLLOWER TASKER]: ", error);
      }
    },
  });

  const handleChangePagination: PaginationProps["onChange"] = (
    page,
    pageSizeParams,
  ) => {
    if (page && page !== currentPage) {
      setCurrentPage(page);
    }

    if (pageSizeParams && pageSizeParams !== pageSize) {
      setPageSize(pageSize);
    }
  };

  return (
    <Flex gap={24} vertical>
      <Row gutter={12} wrap>
        {isFetching && (
          <Flex
            justify="center"
            align="center"
            style={{ height: "100px", width: "100%" }}
          >
            <Spin />
          </Flex>
        )}
        {!isFetching &&
          data?.taskee &&
          data?.taskee.map((taskee, index) => (
            <Col span={6} key={`${taskee}-${index}`}>
              <Card
                onClick={() =>
                  navigate(
                    `/${constantRoutesGlobal.profileTaskee}/${taskee.username}`,
                  )
                }
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={taskee.image as string} />}
              >
                <Meta
                  title={`${taskee.firstname} ${taskee.lastname}`}
                  description={`@${taskee.username}`}
                />
              </Card>
            </Col>
          ))}
      </Row>
      <Pagination
        align="end"
        onChange={handleChangePagination}
        showSizeChanger
        pageSize={pageSize as number}
        total={totalFollower as number}
        current={currentPage as number}
      />
    </Flex>
  );
};

export default TaskeeFollower;
