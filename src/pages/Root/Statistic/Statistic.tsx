import { Flex, Typography } from 'antd';
import { AccountDistributionChart } from './Partials/AccountDistributionChart';
import { DailyRevenueChart } from './Partials/DailyRevenueChart';
import MonthlyRevenueChart from './Partials/MonthlyRevenueChart/MonthlyRevenueChart';
import { Overview } from './Partials/Overview';

const { Title } = Typography;

const StatisticPage = () => {
  return (
    <Flex vertical gap={32}>
      <Flex vertical gap={24} style={{ width: '100%' }}>
        <Flex justify="center" align="center">
          <Title level={4}>Thống kê doanh thu</Title>
        </Flex>
        <Overview />
      </Flex>
      <Flex justify="space-between" align="stretch" gap={32}>
        <DailyRevenueChart />
        <MonthlyRevenueChart />
      </Flex>
      <AccountDistributionChart />
    </Flex>
  );
};

export default StatisticPage;
