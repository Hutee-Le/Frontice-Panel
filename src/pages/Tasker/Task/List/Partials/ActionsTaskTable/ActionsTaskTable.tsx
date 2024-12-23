import { Flex, Button } from 'antd';
import { useNavigate } from 'react-router';
import constantRoutesTasker from '../../../../../../constants/routes/tasker';
import { FC } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import taskerService from '../../../../../../service/Tasker/taskerService';
import taskerQueryKeys from '../../../../../../constants/queryKey/tasker/taskerQueryKey';

type IActionsTaskTableProps = {
  taskId: string;
};

const ActionsTaskTable: FC<IActionsTaskTableProps> = ({ taskId }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutationRemoveTask = useMutation({
    mutationKey: ['remove-task'],
    mutationFn: async () => await taskerService.task.delete({ taskId }),
  });

  const handleRemoveTask = async () => {
    return await toast.promise(
      mutationRemoveTask.mutateAsync().then(async () => {
        return await queryClient.refetchQueries({
          queryKey: [taskerQueryKeys.task.getAll],
        });
      }),
      {
        pending: 'Đang thực hiện xóa nhiệm vụ',
        success: 'Xóa nhiệm vụ thành công',
        error: 'Xóa nhiệm vụ thất bại',
      }
    );
  };

  return (
    <Flex justify="start" align="center" gap={8}>
      <Button
        variant="solid"
        color="primary"
        onClick={() =>
          navigate(`${constantRoutesTasker.task.details}/${taskId}`)
        }
      >
        Xem chi tiết
      </Button>
      <Button
        variant="outlined"
        color="danger"
        onClick={() => handleRemoveTask()}
      >
        Xóa
      </Button>
    </Flex>
  );
};

export default ActionsTaskTable;
