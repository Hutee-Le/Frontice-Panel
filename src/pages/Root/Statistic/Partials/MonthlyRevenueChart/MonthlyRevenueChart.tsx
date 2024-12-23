import { useQuery } from '@tanstack/react-query';
import { Button, DatePicker, Flex, Spin, Typography } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import constantRootQueryKeys from '../../../../../constants/queryKey/root';
import rootService from '../../../../../service/Root/RootService';
import { formatCurrencyVND } from '../../../../../utils/helper';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const MonthlyRevenueChart = () => {
  const [monthlyRange, setMonthlyRange] = useState<
    [string | null, string | null]
  >([null, null]);
  const [rangePickerValue, setRangePickerValue] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  >(null);

  const { data, isFetching, refetch } = useQuery({
    queryKey: [
      constantRootQueryKeys.statistic.getStatisticMonthly,
      monthlyRange,
    ],
    queryFn: async () => {
      const [startDate, endDate] = monthlyRange;
      const params = {
        start_date: startDate ? `${startDate}-1` : '2024-1-1',
        end_date: endDate ? `${endDate}-30` : null,
      };

      try {
        const response = await rootService.statistic.getStatisticMonthly(
          params
        );
        return (
          response.data.map((item) => ({
            ...item,
            total: parseInt(item.total),
          })) || []
        );
      } catch (error) {
        console.error('Error fetching data: ', error);
        return [];
      }
    },
  });

  const handleMonthlyFilter = () => {
    refetch();
  };

  const handleReset = () => {
    setMonthlyRange(['2024-01', null]);
    setRangePickerValue(null);
  };

  const disabledDate = (current: dayjs.Dayjs) => {
    const startDate = dayjs('2024-01-01');
    const today = dayjs();
    return current && (current.isBefore(startDate) || current.isAfter(today));
  };

  return (
    <Flex vertical gap={24} style={{ width: '100%' }}>
      <Flex justify="center" align="center">
        <Title level={4}>Thống kê theo tháng</Title>
      </Flex>

      <Flex justify="center" align="center" gap={12}>
        <RangePicker
          picker="month"
          value={rangePickerValue}
          onChange={(dates) => {
            setMonthlyRange([
              dates?.[0]?.format('YYYY-MM') || null,
              dates?.[1]?.format('YYYY-MM') || null,
            ]);
            setRangePickerValue(dates);
          }}
          disabledDate={disabledDate}
        />
        <Button type="primary" onClick={handleMonthlyFilter}>
          Áp dụng
        </Button>
        <Button onClick={handleReset}>Xóa</Button>
      </Flex>

      <ResponsiveContainer width="100%" height={400}>
        {isFetching ? (
          <Flex justify="center" align="center" style={{ height: '100%' }}>
            <Spin size="large" />
          </Flex>
        ) : data?.length === 0 ? (
          <Flex justify="center" align="center" style={{ height: '100%' }}>
            <Title level={5} style={{ color: '#999' }}>
              Không tìm thấy dữ liệu ở khoảng thời gian này
            </Title>
          </Flex>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => formatCurrencyVND(value)} />
            <Tooltip
              formatter={(value: any) => formatCurrencyVND(value) + ' VND'}
            />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </Flex>
  );
};

export default MonthlyRevenueChart;
