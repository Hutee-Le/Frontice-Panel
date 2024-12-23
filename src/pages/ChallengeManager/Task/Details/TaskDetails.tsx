import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { constantChallengeManagerQueryKey } from "../../../../constants/queryKey/challengeManager";
import { Navigate, useParams } from "react-router";
import constantRoutesGlobal from "../../../../constants/routes/global";
import challengeManagerService from "../../../../service/ChallengeManager/challengeManagerService";
import { Avatar, Card, Divider, Empty, Flex, Typography } from "antd";
import { TaskOverview } from "../../../../components/Components/TaskOverview";
import { ITaskEntity } from "../../../../types/entity/task";
import ListSolutionTask from "./Partials/ListSolutionTask/ListSolutionTask";
import { ViewReportsTask } from "../../../../components/Components/ViewReportsTask";
import { ActionsWithReport } from "./Partials/ActionsWithReport";

const { Text, Title } = Typography;

const defautlAvatar =
  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

const TaskDetailsPage: FC = () => {
  const { taskId } = useParams();

  if (!taskId)
    return <Navigate to={`/${constantRoutesGlobal.errorPage[404]}`} replace />;

  const { isFetching, data: dataTaskDetails } = useQuery({
    queryKey: [constantChallengeManagerQueryKey.task.details],
    queryFn: async () => {
      const response = await challengeManagerService.task.getDetails({
        taskId,
      });
      const responseData = response.data;
      return responseData;
    },
  });

  return (
    <Flex vertical gap={32}>
      {Boolean(dataTaskDetails?.reports.length) && dataTaskDetails?.reports && (
        <ActionsWithReport
          taskId={dataTaskDetails?.id}
          reportNumber={dataTaskDetails?.reports?.length}
        />
      )}
      <TaskOverview
        taskData={dataTaskDetails as ITaskEntity}
        isLoading={isFetching}
        buttonDownloadFiles
      />

      <Flex justify="center" align="stretch" gap={24}>
        <Card
          loading={isFetching}
          style={{ width: "100%", cursor: "pointer" }}
          // onClick={() => scrollToElement("table__taskee__joined")}
        >
          <Flex
            vertical
            justify="center"
            align="center"
            gap={12}
            style={{ height: "100%" }}
          >
            <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
              Người đăng tải
            </Text>

            <Text style={{ fontSize: "20px" }}>
              {dataTaskDetails?.owner.firstname}{" "}
              {dataTaskDetails?.owner.lastname}
            </Text>
          </Flex>
        </Card>
        <Card loading={isFetching} style={{ width: "100%", cursor: "pointer" }}>
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
      </Flex>

      <Divider orientation="left" plain>
        <Title level={4} style={{ margin: "0" }}>
          Danh sách <span style={{ color: "#1CBD74" }}>giải pháp đã nộp</span>
        </Title>
      </Divider>

      <ListSolutionTask taskId={taskId} />

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
