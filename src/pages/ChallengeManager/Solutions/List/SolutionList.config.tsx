import { Button, Flex, TableProps } from "antd";
import { convertTimestampToVietnamTime } from "../../../../utils/convertTime";
import { ISolutionEntity } from "../../../../types/entity/solution";
import { ViewMentorFeedback } from "./Partials/ViewMentorFeedback";
import ViewTaskee from "../../../../components/Components/ViewTaskee/ViewTaskee";

const columnsSolutionList: TableProps<ISolutionEntity>["columns"] = [
  {
    fixed: "left",
    width: 100,
    title: (
      <Flex align="center" justify="center">
        STT
      </Flex>
    ),
    key: "stt",
    render: (_, __, index) => (
      <Flex align="center" justify="center">
        {index + 1}
      </Flex>
    ),
  },
  {
    fixed: "left",
    width: 250,
    title: "Tiêu đề",
    key: "title",
    sorter: (a, b) => a.title?.length - b.title?.length,
    dataIndex: "title",
  },
  {
    title: (
      <Flex justify="center" align="center">
        Lượt thích
      </Flex>
    ),
    width: 160,
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
    title: (
      <Flex align="center" justify="center">
        Lượt không thích
      </Flex>
    ),
    width: 200,
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
    title: (
      <Flex align="center" justify="center">
        Phản hồi của Mentor
      </Flex>
    ),
    width: 200,
    key: "mentor_feedback",
    dataIndex: "mentor_feedback",
    render: (mentorFeedback) => (
      <ViewMentorFeedback mentorFeedback={mentorFeedback} />
    ),
  },
  {
    title: (
      <Flex justify="center" align="center">
        Đăng tải
      </Flex>
    ),
    width: 200,
    key: "submitedAt",
    sorter: (a, b) => a.submitedAt - b.submitedAt,
    dataIndex: "submitedAt",
    render: (timeValue) => {
      const timeFormat = convertTimestampToVietnamTime(timeValue);
      return (
        <Flex align="center" justify="center">
          {timeFormat}
        </Flex>
      );
    },
  },
  {
    title: (
      <Flex justify="center" align="center">
        Bình luận
      </Flex>
    ),
    width: 140,
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
    title: (
      <Flex align="center" justify="center">
        Tác giả
      </Flex>
    ),
    width: 260,
    key: "taskee",
    dataIndex: "taskee",
    render: (taskee) => {
      return <ViewTaskee taskee={taskee} />;
    },
  },
];

export default columnsSolutionList;
