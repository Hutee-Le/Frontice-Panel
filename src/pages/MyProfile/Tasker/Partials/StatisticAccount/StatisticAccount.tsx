import { ArrowUpOutlined } from "@ant-design/icons";
import { Row, Col, Card, Statistic } from "antd";
import useAuthStore from "../../../../../store/Auth/authStore";
import { calculateAccountAge } from "../../../../../utils/convertTime";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import taskQueryKey from "../../../../../constants/queryKey/challengeManager/task";
import taskerService from "../../../../../service/Tasker/taskerService";

const StatisticAccount = () => {
  const [totalTask, setTotalTask] = useState<number>(0);
  const timeCreatedAccount = useAuthStore((state) => state.profile?.createdAt);
  const { isFetching } = useQuery({
    queryKey: [taskQueryKey.getAll],
    queryFn: async () => {
      const response = await taskerService.task.getAll({});
      const responseData = response.data;
      setTotalTask(responseData.total);
      return responseData;
    },
  });
  const accountAge = calculateAccountAge(timeCreatedAccount || 0);
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card bordered={true} loading={isFetching}>
          <Statistic
            title="Bạn đã đăng tải"
            value={totalTask}
            precision={0}
            valueStyle={{ color: "#3f8600" }}
            prefix={<ArrowUpOutlined />}
            suffix="Nhiệm vụ"
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={true}>
          <Statistic
            title="Thời gian hoạt động của tài khoản"
            value={accountAge}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default StatisticAccount;
