import { Avatar, Badge, Button, Flex, TableProps } from "antd";
import { ISolutionEntity } from "../../../../../../types/entity/solution";
import { ViewMentorFeedback } from "../../../../Solutions/List/Partials/ViewMentorFeedback";
import { convertTimestampToVietnamTime } from "../../../../../../utils/convertTime";

const defautlAvatar =
  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

const columnsSolutionList: TableProps<ISolutionEntity>["columns"] = [
  {
    fixed: "left",
    title: "STT",
    key: "stt",
    render: (_, __, index) => index + 1,
  },
  {
    fixed: "left",
    title: "Tiêu đề",
    key: "title",
    sorter: (a, b) => a.title?.length - b.title?.length,
    dataIndex: "title",
  },
  {
    title: "Lượt thích",
    sorter: (a, b) => a.liked - b.liked,
    key: "liked",
    dataIndex: "liked",
    render: (liked) => (
      <Flex justify="center" align="center">
        {liked}
      </Flex>
    ),
  },
  {
    title: "Lượt không thích",
    sorter: (a, b) => a.disliked - b.disliked,
    key: "dislike",
    dataIndex: "disliked",
    render: (disliked) => (
      <Flex justify="center" align="center">
        {disliked}
      </Flex>
    ),
  },
  {
    title: "Phản hồi của Mentor",
    key: "mentor_feedback",
    dataIndex: "mentor_feedback",
    render: (mentorFeedback) => (
      <ViewMentorFeedback mentorFeedback={mentorFeedback} />
    ),
  },
  {
    title: "Đăng tải",
    key: "submitedAt",
    sorter: (a, b) => a.submitedAt - b.submitedAt,
    dataIndex: "submitedAt",
    render: (timeValue) => {
      const timeFormat = convertTimestampToVietnamTime(timeValue);
      return <div>{timeFormat}</div>;
    },
  },
  {
    title: "Bình luận",
    key: "comment",
    dataIndex: "comment",
    sorter: (a, b) => a.comment - b.comment,
    render: (commentValue) => {
      return (
        <>
          <Flex justify="center" align="center">
            <Button variant="text" color="primary">
              {commentValue}
            </Button>
          </Flex>
        </>
      );
    },
  },
  {
    title: "Tác giả",
    key: "taskee",
    dataIndex: "taskee",
    render: (taskee) => {
      return (
        <Button variant="text" color="primary" size="large">
          <Flex justify="flex-start" align="center" gap={12}>
            {taskee.gold_account ? (
              <Badge dot color="volcano" size="default">
                <Avatar src={taskee.image || defautlAvatar} />
              </Badge>
            ) : (
              <Avatar src={taskee.image || defautlAvatar} />
            )}
            <div className="full_name">
              {taskee.firstname} {taskee.lastname}
            </div>
          </Flex>
        </Button>
      );
    },
  },
];

export default columnsSolutionList;
