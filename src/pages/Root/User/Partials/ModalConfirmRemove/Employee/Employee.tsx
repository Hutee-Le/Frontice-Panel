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
import { FC, useState } from "react";
import {
  calculateAccountAge,
  convertTimestampToVietnamTime,
} from "../../../../../../utils/convertTime";
import { IUserEmployeeEntity } from "../../../../../../types/response/root/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import mutationKey from "../../../../../../constants/mutation";
import rootService from "../../../../../../service/Root/RootService";
import { toast } from "react-toastify";
import constantRootQueryKeys from "../../../../../../constants/queryKey/root";

interface IModalConfirmRemoveEmployeeProps {
  isShow: boolean;
  onClose: () => void;
  employeeData: IUserEmployeeEntity;
}

const { Text } = Typography;
const ModalConfirmRemoveEmployee: FC<IModalConfirmRemoveEmployeeProps> = ({
  isShow,
  onClose,
  employeeData,
}) => {
  const queryClient = useQueryClient();
  const [checkboxConfirmValue, setCheckboxConfirmvalue] =
    useState<Boolean>(false);

  const mutationRemoveEmployee = useMutation({
    mutationKey: [mutationKey.removeUser, "admins"],
    mutationFn: async () =>
      await rootService.user.removeUser({ userId: employeeData.id }),
  });

  const handleRemoveUser = async () => {
    return await toast.promise(
      mutationRemoveEmployee.mutateAsync().then(() => {
        queryClient.refetchQueries({
          queryKey: [constantRootQueryKeys.user.getAllUserByRole, "admins"],
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

  const handleOnClose = () => {
    onClose();
  };
  return (
    <Modal
      open={isShow}
      onCancel={handleOnClose}
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
        <Row gutter={8}>
          <Col span={12}>
            <Card>
              <Statistic
                title="Thời gian tạo"
                value={
                  convertTimestampToVietnamTime(employeeData.createdAt)?.split(
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
                value={calculateAccountAge(employeeData.createdAt)}
              />
            </Card>
          </Col>
        </Row>
        {employeeData.adminRole === "challenge" && (
          <Row>
            <Col span={24}>
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
                        {employeeData?.challengeCreated || 0}
                      </Text>
                    </Flex>
                  )}
                  title={
                    <Flex justify="center" align="center">
                      <Text>Số thử thách đã tạo</Text>
                    </Flex>
                  }
                />
              </Card>
            </Col>
          </Row>
        )}
        <Checkbox onChange={(e) => setCheckboxConfirmvalue(e.target.checked)}>
          Tôi xác nhận xóa tài khoản{" "}
          <Text style={{ color: "blue" }}>{employeeData.email}</Text>{" "}
        </Checkbox>
      </Flex>
    </Modal>
  );
};

export default ModalConfirmRemoveEmployee;
