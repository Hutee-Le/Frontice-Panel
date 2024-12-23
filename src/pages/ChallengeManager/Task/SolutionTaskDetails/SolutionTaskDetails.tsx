import { Button, Card, Descriptions, Flex, Typography } from "antd";
import { TaskOverview } from "../../../../components/Components/TaskOverview";
import { useQuery } from "@tanstack/react-query";
import { constantChallengeManagerQueryKey } from "../../../../constants/queryKey/challengeManager";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import challengeManagerService from "../../../../service/ChallengeManager/challengeManagerService";
import constantRoutesGlobal from "../../../../constants/routes/global";
import { ITaskEntity } from "../../../../types/entity/task";
import generateTaskSolutionItemsDescription from "./SolutionTaskDetails.utils";
import { generateItemDescription } from "../../../ProfileTaskee/ProfileTaskee.util";

const { Text } = Typography;

const SolutionTaskDetails = () => {
  const navigate = useNavigate();
  const { taskSolutionId } = useParams();
  const { data, isFetching } = useQuery({
    queryKey: [
      constantChallengeManagerQueryKey.taskSolution.getDetails,
      taskSolutionId,
    ],
    queryFn: async () => {
      if (!taskSolutionId) return;
      const response = await challengeManagerService.taskSolution.getDetails({
        solutionId: taskSolutionId,
      });

      const responseData = response.data;
      return responseData;
    },
  });

  const { data: taskeeData, isFetching: taskeeDataFetching } = useQuery({
    queryKey: [
      constantChallengeManagerQueryKey.taskee.profile,
      data?.taskee.username,
    ],
    queryFn: async () => {
      if (!data?.taskee.username) return;
      try {
        const response = await challengeManagerService.taskee.getProfile({
          usernameTaskee: data?.taskee?.username,
        });

        const responseData = response.data;
        return responseData;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const itemsDescription = generateTaskSolutionItemsDescription(data);
  const itemsDescriptionTaskeeProfile = generateItemDescription(taskeeData);

  if (!taskSolutionId)
    <Navigate to={constantRoutesGlobal.errorPage[404]} replace />;

  return (
    <Flex gap={32} vertical>
      <TaskOverview
        isLoading={isFetching}
        taskData={data?.task as ITaskEntity}
        buttonToTaskDetails
      />

      <Card>
        <Descriptions
          layout="vertical"
          items={itemsDescription}
          title="Thông tin giải pháp"
        />
      </Card>

      <Card loading={taskeeDataFetching}>
        <Descriptions
          items={itemsDescriptionTaskeeProfile}
          title={
            <Flex justify="space-between" align="center">
              <Text style={{ fontSize: "16px" }}>
                Thông tin tác giả giải pháp
              </Text>
              <Button
                variant="text"
                color="primary"
                size="large"
                onClick={() =>
                  navigate(
                    `/${constantRoutesGlobal.profileTaskee}/${taskeeData?.username}`,
                  )
                }
              >
                Xem chi tiết
              </Button>
            </Flex>
          }
        />
      </Card>
    </Flex>
  );
};

export default SolutionTaskDetails;
