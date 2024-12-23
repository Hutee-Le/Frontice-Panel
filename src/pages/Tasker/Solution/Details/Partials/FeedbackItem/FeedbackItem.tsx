import {
  Button,
  Dropdown,
  Form,
  Flex,
  Input,
  MenuProps,
  FormProps,
  Tooltip,
} from "antd";
import { ICommentEntity } from "../../../../../../types/entity/comment";
import { FC, useId, useState } from "react";
import useAuthStore from "../../../../../../store/Auth/authStore";
import { Link } from "react-router-dom";
import constantRoutesGlobal from "../../../../../../constants/routes/global";
import { convertTimestampToVietnamTime } from "../../../../../../utils/convertTime";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { IEditCommentRequest } from "../../../../../../types/request/tasker/solution";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import taskerQueryKeys from "../../../../../../constants/queryKey/tasker/taskerQueryKey";
import taskerService from "../../../../../../service/Tasker/taskerService";
import { toast } from "react-toastify";
import {
  ContentWrapper,
  ListItem,
  StyledAvatar,
  StyledMetaWrapper,
} from "./feedbackItem.style";
import mutationKey from "../../../../../../constants/mutation";

interface IFeedbackItemProps {
  align: "left" | "right";
  commentData: ICommentEntity;
}

const FeedbackItem: FC<IFeedbackItemProps> = ({
  align,
  commentData: comment,
}) => {
  const id = useId();
  const profile = useAuthStore((state) => state.profile);
  const [editState, setEditState] = useState<boolean>(false);
  const [editCommentValue, setEditCommentValue] = useState<string>(
    comment.content,
  );
  const queryClient = useQueryClient();

  const mutationEditComment = useMutation({
    mutationKey: [taskerQueryKeys.taskSolution.editComment, comment.id],
    mutationFn: async () =>
      await taskerService.taskSolution.editComment(
        {
          commentId: comment.id,
        },
        {
          content: editCommentValue,
        },
      ),
  });

  const mutationRemoveComment = useMutation({
    mutationKey: [mutationKey.removeComment, comment.id],
    mutationFn: async () =>
      await taskerService.taskSolution.removeComment({ commentId: comment.id }),
  });

  const handleRemoveCommet = async () => {
    return await toast.promise(
      mutationRemoveComment.mutateAsync().then(() => {
        queryClient.refetchQueries({
          queryKey: [taskerQueryKeys.taskSolution.getComments],
        });
      }),
      {
        pending: "Đang thực hiện xóa phàn hồi",
        success: "Xóa phàn hồi thành công",
        error: "Xóa phản hồi thất bại",
      },
    );
  };

  const handleEditComment: FormProps<IEditCommentRequest>["onFinish"] =
    async () => {
      return await toast.promise(
        mutationEditComment.mutateAsync().then(() => {
          queryClient.refetchQueries({
            queryKey: [taskerQueryKeys.taskSolution.getComments],
          });
          setEditState(false);
        }),
        {
          pending: "Đang thực hiện cập nhật phản hồi",
          success: "Cập nhật phản hồi thành công",
          error: "Cập nhật phản hồi thất bại",
        },
      );
    };

  const handleCancelEditComment = () => {
    setEditState(false);
    setEditCommentValue(comment.content);
  };

  const menuDropdown: MenuProps["items"] = [
    {
      key: "edit",
      label: "Chỉnh sửa",
      onClick: () => setEditState(true),
    },
    {
      key: "remove",
      label: "Xóa",
      onClick: () => handleRemoveCommet(),
    },
  ];

  return (
    <ListItem align={align} key={`${id}`}>
      <ContentWrapper align={align}>
        <StyledAvatar src={comment.user.image} />
        <StyledMetaWrapper align={align}>
          <div className="ant-list-item-meta-title" style={{ width: "100%" }}>
            <Flex
              justify="space-between"
              align="center"
              style={{
                width: "100%",
                flexDirection: align === "right" ? "row-reverse" : "row",
              }}
            >
              {comment.user.username !== profile?.username ? (
                <Link
                  to={`/${constantRoutesGlobal.profileTaskee}/${comment.user.username}`}
                >
                  {comment.user.firstname} {comment.user.lastname}
                </Link>
              ) : (
                <div>
                  {comment.user.firstname} {comment.user.lastname}
                </div>
              )}
              {comment.is_edit && (
                <Tooltip placement="top" title="Phản hồi đã chỉnh sửa">
                  <EditOutlined />
                </Tooltip>
              )}
            </Flex>
          </div>
          <div
            className="ant-list-item-meta-description"
            style={{ width: "100%" }}
          >
            {editState ? (
              <Form autoComplete="off" onFinish={handleEditComment}>
                <Flex vertical gap={12} align="end">
                  <Form.Item<IEditCommentRequest>
                    name="content"
                    rules={[
                      {
                        required: true,
                        message: "Nội dung không được bỏ trống",
                      },
                    ]}
                    style={{ width: "100%", margin: "0" }}
                    initialValue={editCommentValue}
                  >
                    <Input.TextArea
                      style={{ width: "100%", minHeight: "80px" }}
                      value={editCommentValue}
                      onChange={(e) => setEditCommentValue(e.target.value)}
                    />
                  </Form.Item>
                  <Flex gap={8}>
                    <Button onClick={handleCancelEditComment}>Hủy</Button>
                    <Button style={{ width: "fit-content" }} htmlType="submit">
                      Cập nhật
                    </Button>
                  </Flex>
                </Flex>
              </Form>
            ) : (
              <div>{comment.content}</div>
            )}
          </div>
          <Flex
            justify="space-between"
            align="center"
            style={{
              width: "100%",
              flexDirection: align === "right" ? "row-reverse" : "row",
            }}
          >
            <div className="ant-list-item-meta-time">
              {convertTimestampToVietnamTime(comment.created_at)}
            </div>
            {profile?.username === comment.user.username && (
              <Dropdown menu={{ items: menuDropdown }}>
                <EllipsisOutlined style={{ cursor: "pointer" }} />
              </Dropdown>
            )}
          </Flex>
        </StyledMetaWrapper>
      </ContentWrapper>
    </ListItem>
  );
};

export default FeedbackItem;
