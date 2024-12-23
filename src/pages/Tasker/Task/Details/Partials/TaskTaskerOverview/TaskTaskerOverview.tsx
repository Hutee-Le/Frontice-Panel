import {
  Card,
  Row,
  Col,
  Flex,
  Tag,
  Statistic,
  Button,
  Typography,
  Image,
} from "antd";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import taskerQueryKeys from "../../../../../../constants/queryKey/tasker/taskerQueryKey";
import taskerService from "../../../../../../service/Tasker/taskerService";
import { convertTimestampToVietnamTime } from "../../../../../../utils/convertTime";
import { calculateTimeLeft } from "../../../../../../utils/helper";
import { useNavigate } from "react-router-dom";
import constantRoutesTasker from "../../../../../../constants/routes/tasker";

const { Title, Text } = Typography;

type ITaskTaskerOverviewProps = {
  taskId: string;
  showButtonGoToDetails?: boolean;
};

const TaskTaskerOverview: FC<ITaskTaskerOverviewProps> = ({
  taskId,
  showButtonGoToDetails = false,
}) => {
  const navigate = useNavigate();

  const { data: taskData, isFetching } = useQuery({
    queryKey: [taskerQueryKeys.task.getDetails, taskId],
    queryFn: async () => {
      try {
        const response = await taskerService.task.getDetails({ taskId });
        const responseData = response.data;
        return responseData;
      } catch (error) {
        console.log("erorr", error);
      }
    },
  });

  const timeExpired = calculateTimeLeft((taskData?.expiredAt as number) * 1000);

  return (
    <Card loading={isFetching}>
      <Row gutter={24} align={"middle"}>
        <Col span={14}>
          <Flex
            vertical
            justify="start"
            align="stretch"
            gap={24}
            style={{ flex: 2, width: "100%" }}
          >
            <Flex justify="space-between" align="center">
              <Flex vertical justify="start" align="stretch" gap={4}>
                {taskData?.created_at && (
                  <Text style={{ color: "grey", fontSize: "14px" }}>
                    {convertTimestampToVietnamTime(taskData.created_at)}
                  </Text>
                )}
                <Title level={2} style={{ margin: 0 }}>
                  {taskData?.title}
                </Title>
              </Flex>
            </Flex>
            <Flex>
              {taskData?.technical.map((item, index) => (
                <Tag key={index} color="geekblue">
                  {item}
                </Tag>
              ))}
            </Flex>
            <Text>{taskData?.shortDes}</Text>
            <Flex justify="start" align="stretch" gap={12}>
              <Card>
                <Statistic
                  title="Số điểm yêu cầu"
                  precision={2}
                  valueRender={() => (
                    <div style={{ fontSize: "18px" }}>
                      {taskData?.requiredPoint}
                    </div>
                  )}
                />
              </Card>
              {taskData?.expiredAt && (
                <Card>
                  <Statistic
                    title="Thời gian còn lại"
                    precision={2}
                    valueRender={() => (
                      <div style={{ fontSize: "18px" }}>
                        {timeExpired !== null ? (
                          <>
                            {timeExpired.days && `${timeExpired.days} Ngày`}{" "}
                            {timeExpired?.hours} Giờ {timeExpired?.minutes} Phút
                          </>
                        ) : (
                          <span style={{ color: "red" }}>Hết thời gian</span>
                        )}
                      </div>
                    )}
                  />
                </Card>
              )}
            </Flex>
            {showButtonGoToDetails && (
              <Button
                variant="outlined"
                color="primary"
                size="large"
                style={{ width: "60%" }}
                onClick={() =>
                  navigate(
                    `/${constantRoutesTasker.task.root}/${constantRoutesTasker.task.details}/${taskId}`,
                  )
                }
              >
                Chi tiết nhiệm vụ
              </Button>
            )}
          </Flex>
        </Col>
        <Col span={10}>
          <Image
            src={taskData?.image}
            height={300}
            width={"100%"}
            style={{ objectFit: "cover", width: "100%" }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default TaskTaskerOverview;
