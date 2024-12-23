import { Button } from 'antd';
import { FC } from 'react';
import { convertTimestampToVietnamTime } from '../../../utils/convertTime';

interface IExpiredTimeProps {
  expiredTime: number;
}

const ViewExpiredTime: FC<IExpiredTimeProps> = ({ expiredTime }) => {
  const timeExpired = convertTimestampToVietnamTime(expiredTime);
  return (
    <Button variant="outlined" color="default" style={{ minWidth: '120px' }}>
      {timeExpired ? (
        <>{timeExpired.split(' ')[1]}</>
      ) : (
        <span style={{ color: 'red' }}>Hết thời gian</span>
      )}
    </Button>
  );
};

export default ViewExpiredTime;
