import { useQuery } from "@tanstack/react-query";
import { List, Flex, Drawer, Empty } from "antd";
import taskerQueryKeys from "../../../../../../constants/queryKey/tasker/taskerQueryKey";
import { FC } from "react";
import taskerService from "../../../../../../service/Tasker/taskerService";
import { ICommentEntity } from "../../../../../../types/entity/comment";
import useAuthStore from "../../../../../../store/Auth/authStore";
import { MeFeedback } from "../MeFeedback";
import { FeedbackItem } from "../FeedbackItem";

interface IFeedbackTaskSolutionProps {
  taskSolutionId: string;
  isShow: boolean;
  onClose: () => void;
}

const FeedbackTaskSolution: FC<IFeedbackTaskSolutionProps> = ({
  taskSolutionId,
  isShow,
  onClose,
}) => {
  const profile = useAuthStore((state) => state.profile);
  const { isFetching, data } = useQuery({
    queryKey: [taskerQueryKeys.taskSolution.getComments, taskSolutionId],
    queryFn: async () => {
      try {
        const response = await taskerService.taskSolution.getComments({
          taskSolutionId,
        });
        const responseData = response.data;
        return responseData;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Drawer open={isShow} title={"Phản hồi"} onClose={onClose}>
      <Flex vertical gap={12}>
        <List<ICommentEntity>
          loading={isFetching}
          itemLayout="horizontal"
          dataSource={data?.comments}
          locale={{
            emptyText: (
              <Empty description="Chưa có bình luận nào cho giải pháp này" />
            ),
          }}
          renderItem={(comment) => {
            const align =
              profile?.username === comment.user.username ? "left" : "right";
            return <FeedbackItem align={align} commentData={comment} />;
          }}
        />
        <MeFeedback taskSolutionId={taskSolutionId} />
      </Flex>
    </Drawer>
  );
};

export default FeedbackTaskSolution;
