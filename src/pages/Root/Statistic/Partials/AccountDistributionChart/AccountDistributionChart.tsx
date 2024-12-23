import { Flex, Typography, Spin } from 'antd';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import constantRootQueryKeys from '../../../../../constants/queryKey/root';
import rootService from '../../../../../service/Root/RootService';
import { useQuery } from '@tanstack/react-query';

const { Title } = Typography;

const colors = ['#4CAF50', '#FF9800', '#2196F3']; // Colors for the slices

const AccountDistributionChart = () => {
  // Fetch data from API
  const { data, isFetching, error } = useQuery({
    queryKey: [constantRootQueryKeys.statistic.getStatisticOverview],
    queryFn: async () => {
      const response = await rootService.statistic.getStatisticOverview();
      return response?.data || {};
    },
  });

  // Handle error or fallback
  const chartData = data
    ? [
        { name: 'Premium Accounts', value: data.premiumAccounts || 0 },
        {
          name: 'Taskee Accounts (Non-Premium)',
          value: (data.totalTaskees || 0) - (data.premiumAccounts || 0),
        },
        { name: 'Tasker Accounts', value: data.totalTaskers || 0 },
      ]
    : [];

  return (
    <Flex vertical gap={12} align="center">
      <Title level={5}>Phân bố tài khoản khách</Title>

      {isFetching ? (
        <Spin size="large" tip="Đang tải dữ liệu..." />
      ) : error ? (
        <div style={{ color: 'red' }}>Đã xảy ra lỗi khi tải dữ liệu!</div>
      ) : (
        <PieChart width={700} height={400}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            label={(entry) => `${entry.name}: ${entry.value}`}
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </Flex>
  );
};

export default AccountDistributionChart;
