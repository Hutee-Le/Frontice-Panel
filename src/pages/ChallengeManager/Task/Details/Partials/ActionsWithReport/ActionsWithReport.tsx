import { Button, Card, Flex, Modal, Typography } from "antd";
import { FC } from "react";
import { toast } from "react-toastify";
import challengeManagerService from "../../../../../../service/ChallengeManager/challengeManagerService";
import { useNavigate } from "react-router-dom";
import constantRoutesChallengeManager from "../../../../../../constants/routes/challengeManager";

interface IActionsWithReportProps {
  taskId: string;
  reportNumber: number | string;
}

const { Text } = Typography;
const { confirm } = Modal;

const ActionsWithReport: FC<IActionsWithReportProps> = ({
  taskId,
  reportNumber,
}) => {
  const navigate = useNavigate();
  const handleValid = () => {
    confirm({
      title: "Xác nhận Task không vi phạm",
      content:
        "Nếu Task được xác nhận không vi phạm thì các report sẽ bị xóa bỏ và task sẽ quay về trạng thái bình thường không còn bị report",
      okText: "Xác nhận",
      cancelText: "Hủy bỏ",
      onOk: async () => {
        return toast.promise(
          challengeManagerService.task
            .validTaskReport({ taskId })
            .then(() =>
              navigate(
                `/${constantRoutesChallengeManager.pages.tasks.root}/${constantRoutesChallengeManager.pages.tasks.report}`,
              ),
            ),
          {
            pending: "Đang thực hiện hủy bỏ các báo cáo",
            success: "Hủy bỏ thành công",
            error: "Hủy bỏ thất bại",
          },
        );
      },
      onClose: () => {},
      onCancel: () => {},
    });
  };

  const handleNotValid = () => {
    confirm({
      title: "Xác nhận Task vi phạm",
      content:
        "Nếu bạn xác nhận Task vi phạm thì Task sẽ bị xóa mềm và không còn xuất hiện trong các danh sách của Taskee",
      okText: "Xác nhận",
      cancelText: "Hủy bỏ",
      onOk: async () => {
        return toast.promise(
          challengeManagerService.task.inValidTaskReport({ taskId }),
          {
            pending: "Đang thực hiện xóa mềm",
            success: "Xóa thành công",
            error: "Xoá thất bại",
          },
        );
      },
      onCancel: () => {},
      onClose: () => {},
    });
  };

  return (
    <Card size="small">
      <Flex vertical gap={12}>
        <Flex
          align="center"
          justify="center"
          style={{
            padding: "8px 0px",
            borderRadius: "4px",
            background: "#EA5B33",
          }}
        >
          <Text style={{ color: "white" }}>
            Nhiệm vụ đang bị {reportNumber} báo cáo
          </Text>
        </Flex>
        <Flex justify="start" align="stretch" gap={12}>
          <Button
            size="large"
            style={{ width: "100%" }}
            variant="solid"
            color="primary"
            onClick={() => handleValid()}
          >
            Không vi phạm
          </Button>
          <Button
            size="large"
            style={{ width: "100%" }}
            variant="outlined"
            color="danger"
            onClick={handleNotValid}
          >
            Vi phạm{" "}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ActionsWithReport;
