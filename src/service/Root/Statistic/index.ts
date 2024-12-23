import axiosClient from '../../../axios/axiosClient';
import constantRootApi from '../../../constants/api/root';
import {
  IGetStatisticDaysParams,
  IGetStatisticMonthlyParams,
} from '../../../types/request/root/statistic';
import { IStatisticService } from '../../../types/services/root/statistic';

const statisticService: IStatisticService = {
  getStatisticDays: (params: IGetStatisticDaysParams) => {
    const { start_date = null, end_date = null } = params;
    return axiosClient.get(
      `${constantRootApi.statistic.getDays}?start_date=${
        Boolean(start_date) ? start_date : '2024-1-1'
      }${Boolean(end_date) ? `&end_date=${end_date}` : ''}`
    );
  },

  getStatisticMonthly: (params: IGetStatisticMonthlyParams) => {
    const { start_date = null, end_date = null } = params;
    return axiosClient.get(
      `${constantRootApi.statistic.getMonthly}?start_date=${
        Boolean(start_date) ? start_date : '2024-1-1'
      }${Boolean(end_date) && `&end_date=${end_date}`}`
    );
  },

  getStatisticOverview: () => {
    return axiosClient.get(constantRootApi.statistic.getOverview);
  },
};

export default statisticService;
