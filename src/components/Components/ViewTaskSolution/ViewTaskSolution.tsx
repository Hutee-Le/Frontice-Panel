import { Button, Flex } from "antd";
import { FC, useState } from "react";
import { TaskSolutionModal } from "../Modal/TaskSolution";

interface IViewTaskSolutionProps {
  taskId: string;
  solutionQuantity: number | string;
}

const ViewTaskSolution: FC<IViewTaskSolutionProps> = ({
  taskId,
  solutionQuantity,
}) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  return (
    <>
      <Flex justify="center" align="center">
        <Button
          onClick={() => setIsShowModal(true)}
          variant="outlined"
          color="primary"
        >
          {solutionQuantity}
        </Button>
      </Flex>
      {isShowModal && (
        <TaskSolutionModal
          isShow={isShowModal}
          handleChangeShow={(value) => setIsShowModal(value)}
          taskId={taskId}
        />
      )}
    </>
  );
};

export default ViewTaskSolution;
