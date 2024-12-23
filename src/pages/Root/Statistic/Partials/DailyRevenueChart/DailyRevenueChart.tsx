import { useQuery } from '@tanstack/react-query';
import { Button, DatePicker, Flex, Spin, Typography } from 'antd';
import { useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import constantRootQueryKeys from '../../../../../constants/queryKey/root';
import rootService from '../../../../../service/Root/RootService';
import { formatCurrencyVND } from '../../../../../utils/helper';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Title } = Typography;

const DailyRevenueChart = () => {
  const [dailyRange, setDailyRange] = useState<[string | null, string | null]>([
    null,
    null,
  ]);
  const [rangePickerValue, setRangePickerValue] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  >(null);

  // Hàm gọi API lấy dữ liệu
  const { data, isFetching, refetch } = useQuery({
    queryKey: [constantRootQueryKeys.statistic.getStatisticDays, dailyRange],
    queryFn: async () => {
      const [startDate, endDate] = dailyRange;
      const params = {
        start_date: startDate || '2024-01-01',
        end_date: endDate || null,
      };

      try {
        const response = await rootService.statistic.getStatisticDays(params);
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

  const handleDailyFilter = () => {
    refetch();
  };

  const disabledDate = (current: dayjs.Dayjs) => {
    const startDate = dayjs('2024-01-01');
    const today = dayjs();
    return current && (current.isBefore(startDate) || current.isAfter(today));
  };

  const handleReset = () => {
    setDailyRange(['2024-01-01', null]);
    setRangePickerValue(null);
  };

  return (
    <Flex vertical gap={24} style={{ width: '100%' }}>
      <Flex justify="center" align="center">
        <Title level={4}>Thống kê theo ngày</Title>
      </Flex>

      <Flex justify="center" gap={12} align="center">
        <RangePicker
          value={rangePickerValue}
          onChange={(dates) => {
            setDailyRange([
              dates?.[0]?.format('YYYY-MM-DD') || null,
              dates?.[1]?.format('YYYY-MM-DD') || null,
            ]);
            setRangePickerValue(dates);
          }}
          disabledDate={disabledDate}
        />
        <Button type="primary" onClick={handleDailyFilter}>
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
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(value) => formatCurrencyVND(value)} />
            <Tooltip
              formatter={(value: any) => formatCurrencyVND(value) + ' VND'}
            />
            <Line type="monotone" dataKey="total" stroke="#82ca9d" />
          </LineChart>
        )}
      </ResponsiveContainer>
    </Flex>
  );
};

export default DailyRevenueChart;
