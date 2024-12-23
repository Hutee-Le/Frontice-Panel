import { useQuery } from "@tanstack/react-query";
import { Divider, Flex, Card, Avatar, Empty, Typography, Row, Col } from "antd";
import { useParams, Navigate } from "react-router";
import { ViewReportsTask } from "../../../../components/Components/ViewReportsTask";
import constantRoutesGlobal from "../../../../constants/routes/global";
import { ActionsWithReport } from "../../../ChallengeManager/Task/Details/Partials/ActionsWithReport";
import taskerQueryKeys from "../../../../constants/queryKey/tasker/taskerQueryKey";
import taskerService from "../../../../service/Tasker/taskerService";
import ListTaskSolution from "./Partials/ListTaskSolution/ListTaskSolution";
import { TaskTaskerOverview } from "./Partials/TaskTaskerOverview";

const defautlAvatar =
  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

const { Title, Text } = Typography;

const TaskDetailsPage = () => {
  const { taskId } = useParams();

  if (!taskId)
    return <Navigate to={`/${constantRoutesGlobal.errorPage[404]}`} replace />;

  const { isFetching, data: dataTaskDetails } = useQuery({
    queryKey: [taskerQueryKeys.task.getDetails, taskId],
    queryFn: async () => {
      const response = await taskerService.task.getDetails({
        taskId: taskId,
      });
      const responseData = response.data;
      return responseData;
    },
  });

  return (
    <Flex vertical gap={32}>
      {Boolean(dataTaskDetails?.reports?.length) &&
        dataTaskDetails?.reports && (
          <ActionsWithReport
            taskId={dataTaskDetails?.id}
            reportNumber={dataTaskDetails?.reports?.length}
          />
        )}
      <TaskTaskerOverview taskId={taskId} />
      <Row>
        <Col span={24}>
          <Card
            loading={isFetching}
            style={{ width: "100%", cursor: "pointer" }}
          >
            <Flex vertical justify="center" align="center" gap={12}>
              <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
                Công ty
              </Text>

              <Flex justify="center" align="center" gap={12} vertical>
                <Avatar
                  src={dataTaskDetails?.owner.image || defautlAvatar}
                  size={"large"}
                />
                <Flex vertical justify="center" align="center">
                  <Text>{dataTaskDetails?.owner.company}</Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Card
            loading={isFetching}
            style={{ width: "100%", cursor: "pointer" }}
          >
            <Flex
              vertical
              justify="center"
              align="center"
              gap={12}
              style={{ height: "100%" }}
            >
              <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
                Số người tham gia
              </Text>

              <Text style={{ fontSize: "20px" }}>
                {dataTaskDetails?.joinTotal} Người
              </Text>
            </Flex>
          </Card>
        </Col>

        <Col span={12}>
          <Card
            loading={isFetching}
            style={{ width: "100%", cursor: "pointer" }}
          >
            <Flex
              vertical
              justify="center"
              align="center"
              gap={12}
              style={{ height: "100%" }}
            >
              <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
                Số người hoàn thành
              </Text>

              <Text style={{ fontSize: "20px" }}>
                {dataTaskDetails?.submittedTotal} Người
              </Text>
            </Flex>
          </Card>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        <Title level={4} style={{ margin: "0" }}>
          Danh sách <span style={{ color: "#1CBD74" }}>giải pháp đã nộp</span>
        </Title>
      </Divider>
      <ListTaskSolution taskId={taskId} />
      <Divider orientation="left" plain>
        <Title level={4} style={{ margin: "0" }}>
          Danh sách <span style={{ color: "#EA5B33" }}>tố cáo</span>
        </Title>
      </Divider>
      {dataTaskDetails?.reports ? (
        <ViewReportsTask reportsData={dataTaskDetails?.reports} />
      ) : (
        <Empty description="Không tìm thấy tố cáo nào..." />
      )}
    </Flex>
  );
};

export default TaskDetailsPage;
