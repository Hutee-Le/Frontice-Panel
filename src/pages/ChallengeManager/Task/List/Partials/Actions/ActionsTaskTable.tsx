import { Button, Flex } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router';
import constantRoutesChallengeManager from '../../../../../../constants/routes/challengeManager';

interface IActionTaskTableProps {
  taskId: string;
}

const ActionTaskTable: FC<IActionTaskTableProps> = ({ taskId }) => {
  const navigate = useNavigate();

  return (
    <Flex justify="start" align="center" gap={8}>
      <Button
        variant="solid"
        color="primary"
        onClick={() =>
          navigate(
            `/${constantRoutesChallengeManager.pages.tasks.root}/${constantRoutesChallengeManager.pages.tasks.details}/${taskId}`
          )
        }
      >
        Xem chi tiết
      </Button>
    </Flex>
  );
};

export default ActionTaskTable;
