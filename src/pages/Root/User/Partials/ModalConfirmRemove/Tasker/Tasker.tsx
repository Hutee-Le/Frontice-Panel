import {
  Card,
  Checkbox,
  Col,
  Flex,
  Modal,
  Row,
  Statistic,
  Typography,
} from "antd";
import { IUserTaskerEntity } from "../../../../../../types/response/root/user";
import { FC, useState } from "react";
import {
  convertTimestampToVietnamTime,
  calculateAccountAge,
} from "../../../../../../utils/convertTime";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import mutationKey from "../../../../../../constants/mutation";
import constantRootQueryKeys from "../../../../../../constants/queryKey/root";
import rootService from "../../../../../../service/Root/RootService";

interface IModalConfirmRemoveTaskerProps {
  isShow: boolean;
  onClose: () => void;
  taskerData: IUserTaskerEntity;
}

const { Text } = Typography;
const ModalConfirmRemoveTasker: FC<IModalConfirmRemoveTaskerProps> = ({
  isShow,
  onClose,
  taskerData,
}) => {
  const queryClient = useQueryClient();
  const [checkboxConfirmValue, setCheckboxConfirmvalue] =
    useState<Boolean>(false);

  const mutationRemoveEmployee = useMutation({
    mutationKey: [mutationKey.removeUser, "tasker"],
    mutationFn: async () =>
      await rootService.user.removeUser({ userId: taskerData.id }),
  });

  const handleOnCancel = () => {
    onClose();
  };

  const handleRemoveUser = async () => {
    return await toast.promise(
      mutationRemoveEmployee.mutateAsync().then(() => {
        queryClient.refetchQueries({
          queryKey: [constantRootQueryKeys.user.getAllUserByRole, "taskers"],
        });
        setCheckboxConfirmvalue(false);
        onClose();
      }),
      {
        pending: "Đang thực hiện xóa tài khoản",
        success: "Xóa tài khoản thành công",
        error: "Xóa tài khoản thất bại",
      },
    );
  };
  return (
    <Modal
      open={isShow}
      onCancel={handleOnCancel}
      width={700}
      title="Xác nhận xóa tài khoản"
      okText="Xóa tài khoản"
      cancelText="Hủy"
      okButtonProps={{
        disabled: !checkboxConfirmValue,
        loading: mutationRemoveEmployee.isPending,
      }}
      cancelButtonProps={{ disabled: mutationRemoveEmployee.isPending }}
      onOk={handleRemoveUser}
    >
      <Flex vertical gap={8}>
        <Row gutter={8} align={"stretch"}>
          <Col span={12}>
            <Card style={{ height: "100%" }}>
              <Statistic
                title="Thời gian tạo"
                value={
                  convertTimestampToVietnamTime(taskerData.createdAt)?.split(
                    " ",
                  )[1]
                }
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title={"Thời gian hoạt động"}
                value={calculateAccountAge(taskerData.createdAt)}
              />
            </Card>
          </Col>
        </Row>
        <Checkbox onChange={(e) => setCheckboxConfirmvalue(e.target.checked)}>
          Tôi xác nhận xóa tài khoản{" "}
          <Text style={{ color: "blue" }}>{taskerData.email}</Text>
        </Checkbox>
      </Flex>
    </Modal>
  );
};

export default ModalConfirmRemoveTasker;
