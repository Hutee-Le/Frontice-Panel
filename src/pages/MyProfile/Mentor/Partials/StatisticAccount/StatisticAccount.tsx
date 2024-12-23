import { ArrowUpOutlined } from "@ant-design/icons";
import { Row, Col, Card, Statistic } from "antd";
import { FC } from "react";
import { calculateAccountAge } from "../../../../../utils/convertTime";
import useAuthStore from "../../../../../store/Auth/authStore";
import useSolutionStore from "../../../../../store/Solution/solutionStore";

interface IStatisticAccountProps {}

const StatisticAccount: FC<IStatisticAccountProps> = ({}) => {
  const timeCreatedAccount = useAuthStore((state) => state.profile?.createdAt);
  const solutionRespondedLength = useSolutionStore(
    (state) => state.solutionCount,
  );
  const accountAge = calculateAccountAge(timeCreatedAccount || 0);
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card bordered={true}>
          <Statistic
            title="Số giải pháp bạn đã phản hồi"
            value={solutionRespondedLength}
            precision={0}
            valueStyle={{ color: "#3f8600" }}
            prefix={<ArrowUpOutlined />}
            suffix="Giải pháp"
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
