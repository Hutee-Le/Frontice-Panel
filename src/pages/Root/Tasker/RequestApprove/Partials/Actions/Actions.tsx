import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Flex } from "antd";
import { FC } from "react";
import rootService from "../../../../../../service/Root/RootService";
import { toast } from "react-toastify";
import constantRootQueryKeys from "../../../../../../constants/queryKey/root";

type IActionsRequestApproveProps = {
  taskerId: string;
};

const ActionsRequestApprove: FC<IActionsRequestApproveProps> = ({
  taskerId,
}) => {
  const mutationApprove = useMutation({
    mutationKey: ["approve-tasker", taskerId],
    mutationFn: async () => rootService.tasker.approve({ tasker_id: taskerId }),
  });

  const mutationRemove = useMutation({
    mutationKey: ["remove-tasker", taskerId],
    mutationFn: async () => rootService.tasker.remove({ tasker_id: taskerId }),
  });

  const queryClient = useQueryClient();

  const onApproveTasker = async () => {
    return await toast.promise(
      mutationApprove.mutateAsync().then(async () => {
        return await queryClient.refetchQueries({
          queryKey: [constantRootQueryKeys.tasker.getAllRequestApprove],
        });
      }),
      {
        success: "Duyệt tài khoản thành công",
        pending: "Đang thực hiện duyệt tài khoản",
        error: "Duyệt tài khoản thất bại",
      },
    );
  };

  const onRemoveTasker = async () => {
    return await toast.promise(
      mutationRemove.mutateAsync().then(async () => {
        return await queryClient.refetchQueries({
          queryKey: [constantRootQueryKeys.tasker.getAllRequestApprove],
        });
      }),
      {
        pending: "Đang thực hiện xóa tài khoản tuyển dụng",
        success: "Xóa tài khoản tuyển dụng thành công",
        error: "Xóa tài khoản tuyển dụng thất bại",
      },
    );
  };
  return (
    <Flex justify="start" align="center" gap={12}>
      <Button variant="solid" onClick={onApproveTasker}>
        Duyệt
      </Button>
      <Button variant="outlined" color="danger" onClick={onRemoveTasker}>
        Xóa
      </Button>
    </Flex>
  );
};

export default ActionsRequestApprove;
