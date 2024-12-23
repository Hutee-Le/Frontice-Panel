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
import { IUserTaskeeEntity } from "../../../../../../types/response/root/user";
import { FC, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import mutationKey from "../../../../../../constants/mutation";
import constantRootQueryKeys from "../../../../../../constants/queryKey/root";
import rootService from "../../../../../../service/Root/RootService";
import {
  convertTimestampToVietnamTime,
  calculateAccountAge,
} from "../../../../../../utils/convertTime";

interface IModalConfirmRemoveTaskeeProps {
  isShow: boolean;
  onClose: () => void;
  taskeeData: IUserTaskeeEntity;
}

const { Text } = Typography;

const ModalConfirmRemoveTaskee: FC<IModalConfirmRemoveTaskeeProps> = ({
  isShow,
  onClose,
  taskeeData,
}) => {
  const queryClient = useQueryClient();
  const [checkboxConfirmValue, setCheckboxConfirmvalue] =
    useState<Boolean>(false);

  const mutationRemoveEmployee = useMutation({
    mutationKey: [mutationKey.removeUser, "taskee"],
    mutationFn: async () =>
      await rootService.user.removeUser({ userId: taskeeData.id }),
  });

  const handleOnCancel = () => {
    onClose();
  };

  const handleRemoveUser = async () => {
    return await toast.promise(
      mutationRemoveEmployee.mutateAsync().then(() => {
        queryClient.refetchQueries({
          queryKey: [constantRootQueryKeys.user.getAllUserByRole, "taskees"],
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
                  convertTimestampToVietnamTime(taskeeData.createdAt)?.split(
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
                value={calculateAccountAge(taskeeData.createdAt)}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Card>
              <Statistic
                valueRender={() => (
                  <Flex justify="center" align="center">
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: "24px",
                        margin: "0",
                      }}
                    >
                      {taskeeData?.challengeJoined || 0}
                    </Text>
                  </Flex>
                )}
                title={
                  <Flex justify="center" align="center">
                    <Text>Số thử thách đã tham gia</Text>
                  </Flex>
                }
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                valueRender={() => (
                  <Flex justify="center" align="center">
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: "24px",
                        margin: "0",
                      }}
                    >
                      {taskeeData?.submittedChallenges || 0}
                    </Text>
                  </Flex>
                )}
                title={
                  <Flex justify="center" align="center">
                    <Text>Số thử thách đã hoàn thành</Text>
                  </Flex>
                }
              />
            </Card>
          </Col>
        </Row>
        <Checkbox onChange={(e) => setCheckboxConfirmvalue(e.target.checked)}>
          Tôi xác nhận xóa tài khoản{" "}
          <Text style={{ color: "blue" }}>{taskeeData.email}</Text>
        </Checkbox>
      </Flex>
    </Modal>
  );
};

export default ModalConfirmRemoveTaskee;
