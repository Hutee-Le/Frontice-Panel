import { useQuery } from '@tanstack/react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import taskerQueryKeys from '../../../../constants/queryKey/tasker/taskerQueryKey';
import constantRoutesGlobal from '../../../../constants/routes/global';
import taskerService from '../../../../service/Tasker/taskerService';
import { Flex, Card, Avatar, Tag, Typography } from 'antd';
import { convertTimestampToVietnamTime } from '../../../../utils/convertTime';
import { ActionsSolutionDetails } from './Partials/ActionsSolutionDetails';
import { TaskTaskerOverview } from '../../Task/Details/Partials/TaskTaskerOverview';

const defautlAvatar =
  'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg';

const { Text, Title } = Typography;

const SolutionDetailsPage = () => {
  const { taskSolutionId } = useParams();
  const navigate = useNavigate();

  if (!taskSolutionId) {
    return <Navigate to={constantRoutesGlobal.errorPage['404']} replace />;
  }

  const { isFetching, data: taskSolutionData } = useQuery({
    queryKey: [taskerQueryKeys.taskSolution.getById, taskSolutionId],
    queryFn: async () => {
      try {
        const response = await taskerService.taskSolution.getById({
          taskId: taskSolutionId,
        });
        const responseData = response.data;
        return responseData;
      } catch (error) {
        console.log('[ERROR TASK SOLUTION DETAILS]: ', error);
      }
    },
  });

  return (
    <Flex vertical gap={32}>
      {taskSolutionData?.task && (
        <TaskTaskerOverview
          taskId={taskSolutionData.task.id}
          showButtonGoToDetails
        />
      )}

      <Flex justify="center" align="center" gap={24}>
        <Card
          hoverable
          onClick={() =>
            navigate(
              `/${constantRoutesGlobal.profileTaskee}/${taskSolutionData?.taskee.username}`
            )
          }
          loading={isFetching}
          style={{ width: '100%', cursor: 'pointer' }}
        >
          <Flex vertical justify="center" align="center" gap={12}>
            <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>
              Người thực hiện
            </Text>

            <Flex justify="center" align="center" gap={12} vertical>
              <Avatar
                src={taskSolutionData?.taskee.image || defautlAvatar}
                size={'large'}
              />
              <Flex vertical justify="center" align="center" gap={8}>
                <Text>
                  {taskSolutionData?.taskee.firstname}{' '}
                  {taskSolutionData?.taskee.lastname}
                </Text>
                <Text style={{ fontSize: '14px', color: 'grey' }}>
                  {taskSolutionData?.taskee.gold_account && (
                    <Tag color="gold">Premium</Tag>
                  )}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Flex>

      <ActionsSolutionDetails
        liveGithub={taskSolutionData?.liveGithub || null}
        github={taskSolutionData?.github || null}
        taskSolutionId={taskSolutionId}
      />

      <Card type="inner" title={taskSolutionData?.title}>
        <Flex vertical gap={12}>
          <Flex vertical>
            <Title level={5}>Thời gian nộp</Title>
            <Text>
              {convertTimestampToVietnamTime(
                taskSolutionData?.submitedAt as number
              )}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default SolutionDetailsPage;
