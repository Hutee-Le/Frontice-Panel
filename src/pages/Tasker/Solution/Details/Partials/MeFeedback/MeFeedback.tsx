import { Avatar, Button, Flex, Form, FormProps, Input } from "antd";
import useAuthStore from "../../../../../../store/Auth/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import mutationKey from "../../../../../../constants/mutation";
import { FC, useState } from "react";
import taskerService from "../../../../../../service/Tasker/taskerService";
import { ICreateCommentRequest } from "../../../../../../types/request/tasker/solution";
import { toast } from "react-toastify";
import taskerQueryKeys from "../../../../../../constants/queryKey/tasker/taskerQueryKey";

interface IMefeedbackProps {
  taskSolutionId: string;
}

const MeFeedback: FC<IMefeedbackProps> = ({ taskSolutionId }) => {
  const queryClient = useQueryClient();
  const profile = useAuthStore((state) => state.profile);
  const mutationFeedback = useMutation({
    mutationKey: [mutationKey.createComment, taskSolutionId],
    mutationFn: async (data: ICreateCommentRequest) =>
      await taskerService.taskSolution.createComment(data),
  });
  const [commentValue, setCommentValue] = useState<string>("");

  const handleFinish: FormProps<ICreateCommentRequest>["onFinish"] = async (
    formValue,
  ) => {
    return await toast.promise(
      mutationFeedback
        .mutateAsync({
          ...formValue,
          parent_id: "",
          task_solution_id: taskSolutionId,
        })
        .then(() => {
          queryClient.refetchQueries({
            queryKey: [taskerQueryKeys.taskSolution.getComments],
          });
          setCommentValue("");
        }),
      {
        pending: "Đang thực hiện phàn hồi",
        success: "Phản hồi thành công",
        error: "Phản hồi thất bại",
      },
    );
  };

  return (
    <>
      <Form<ICreateCommentRequest> onFinish={handleFinish}>
        <Flex vertical gap={12}>
          <Form.Item<ICreateCommentRequest>
            style={{ margin: "0" }}
            name={"content"}
            rules={[
              {
                required: true,
                message: "Nội dung phản hồi không được để trống",
              },
            ]}
          >
            <Flex justify="start" gap={12} align="start">
              <Avatar
                src={profile?.image}
                size={32}
                style={{ flexShrink: "0" }}
              />
              <Input.TextArea
                style={{ minHeight: "80px", flexGrow: "0" }}
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                placeholder="Nhập phản hồi của bạn"
              />
            </Flex>
          </Form.Item>
          <Flex justify="end" align="center">
            <Button
              variant="outlined"
              color="default"
              size="middle"
              htmlType="submit"
            >
              Phàn hồi
            </Button>
          </Flex>
        </Flex>
      </Form>
    </>
  );
};

export default MeFeedback;
