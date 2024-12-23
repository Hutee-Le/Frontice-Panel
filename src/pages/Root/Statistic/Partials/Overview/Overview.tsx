import { Card, Col, Row } from 'antd';
import { formatCurrencyVND } from '../../../../../utils/helper';
import { useQuery } from '@tanstack/react-query';
import constantRootQueryKeys from '../../../../../constants/queryKey/root';
import rootService from '../../../../../service/Root/RootService';

const Overview = () => {
  const { data, isFetching } = useQuery({
    queryKey: [constantRootQueryKeys.statistic.getStatisticOverview],
    queryFn: async () => {
      try {
        const response = await rootService.statistic.getStatisticOverview();
        const responseData = response.data;
        return responseData;
      } catch (error) {
        console.log('error: ', error);
      }
    },
  });
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card title="Tổng doanh thu" loading={isFetching}>
          {formatCurrencyVND(data?.statistic.total as string)} VND
        </Card>
      </Col>
      <Col span={6}>
        <Card title="Doanh thu hôm nay" loading={isFetching}>
          {formatCurrencyVND(data?.statistic.dailyTotal as string)} VND
        </Card>
      </Col>
      <Col span={6}>
        <Card title="Doanh thu tháng" loading={isFetching}>
          {formatCurrencyVND(data?.statistic.monthlyTotal as string)} VND
        </Card>
      </Col>
      <Col span={6}>
        <Card title="Doanh thu năm" loading={isFetching}>
          {formatCurrencyVND(data?.statistic.yearlyTotal as string)} VND
        </Card>
      </Col>
    </Row>
  );
};

export default Overview;
