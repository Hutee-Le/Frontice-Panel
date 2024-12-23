import { Button, Flex } from "antd";
import { FC, useState } from "react";
import { FeedbackModal } from "../FeedbackModal";
import { ISolutionFeedbackEntity } from "../../../../../../types/entity/solution";

interface ISolutionFeedbackActionsProps {
  solutionData: ISolutionFeedbackEntity;
  textButtonViewFeedback?: string;
}

const SolutionFeedbackActions: FC<ISolutionFeedbackActionsProps> = ({
  solutionData,
  textButtonViewFeedback = "Phản hồi",
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleFeedback = () => {
    setIsOpenModal(true);
  };

  const handleCloseFeedback = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Flex justify="start" align="stretch" gap={8}>
        <Button
          variant="outlined"
          color="primary"
          size="middle"
          onClick={handleFeedback}
        >
          {textButtonViewFeedback}
        </Button>
      </Flex>
      <FeedbackModal
        solutionData={solutionData}
        isOpen={isOpenModal}
        onCloseModal={handleCloseFeedback}
      />
    </>
  );
};

export default SolutionFeedbackActions;
