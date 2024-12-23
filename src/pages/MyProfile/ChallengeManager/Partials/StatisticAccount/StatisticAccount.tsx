import { ArrowUpOutlined } from "@ant-design/icons";
import { Row, Col, Card, Statistic } from "antd";
import useAuthStore from "../../../../../store/Auth/authStore";
import { calculateAccountAge } from "../../../../../utils/convertTime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { constantChallengeManagerQueryKey } from "../../../../../constants/queryKey/challengeManager";
import challengeManagerService from "../../../../../service/ChallengeManager/challengeManagerService";

const StatisticAccount = () => {
  const timeCreatedAccount = useAuthStore((state) => state.profile?.createdAt);
  const accountAge = calculateAccountAge(timeCreatedAccount || 0);
  const [totalMyChallenge, setTotalMyChallenge] = useState<string | number>(0);
  const { isFetching } = useQuery({
    queryKey: [constantChallengeManagerQueryKey.challenge.myChallenges],
    queryFn: async () => {
      try {
        const response = await challengeManagerService.challenge.getAll({
          get: "owner",
        });
        const responseData = response.data;
        setTotalMyChallenge(responseData.total);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card bordered={true} loading={isFetching}>
          <Statistic
            title="Số lượng thử thách bạn đăng tải"
            value={totalMyChallenge}
            precision={0}
            valueStyle={{ color: "#3f8600" }}
            prefix={<ArrowUpOutlined />}
            suffix="Thử thách"
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
