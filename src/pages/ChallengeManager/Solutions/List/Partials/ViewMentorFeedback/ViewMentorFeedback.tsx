import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, List, Modal } from "antd";
import { FC, useState } from "react";
import { ISolutionEntity } from "../../../../../../types/entity/solution";

interface IViewMentorFeedbackProps {
  mentorFeedback: ISolutionEntity["mentor_feedback"];
}

const ViewMentorFeedback: FC<IViewMentorFeedbackProps> = ({
  mentorFeedback,
}) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  if (!mentorFeedback) {
    return (
      <Flex justify="center" align="center">
        <Button
          disabled
          icon={<CloseOutlined />}
          color="danger"
          variant="solid"
        ></Button>
      </Flex>
    );
  }
  return (
    <>
      <Flex justify="center" align="center">
        <Button
          color="primary"
          variant="solid"
          icon={<CheckOutlined />}
          onClick={() => setIsShowModal(true)}
        ></Button>
      </Flex>
      <Modal
        title={"Phản hồi của Mentor"}
        open={isShowModal && Boolean(mentorFeedback)}
        footer={() => (
          <Button
            variant="solid"
            size="middle"
            onClick={() => setIsShowModal(false)}
          >
            Hủy
          </Button>
        )}
        onCancel={() => setIsShowModal(false)}
      >
        <List>
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={mentorFeedback.admin_feedback.image} />}
              title={mentorFeedback.admin_feedback.fullname}
              description={mentorFeedback.feedback}
            />
          </List.Item>
        </List>
      </Modal>
    </>
  );
};

export default ViewMentorFeedback;
