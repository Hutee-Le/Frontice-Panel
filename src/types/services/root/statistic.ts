import { IBaseResponse } from '../../base/response';
import {
  IGetStatisticDaysParams,
  IGetStatisticMonthlyParams,
} from '../../request/root/statistic';
import {
  IGetStatisticDaysResponse,
  IGetStatisticMonthlyResponse,
  IGetStatisticOverviewResponse,
} from '../../response/root/statistic';

export type IStatisticService = {
  getStatisticOverview: () => Promise<
    IBaseResponse<IGetStatisticOverviewResponse>
  >;
  getStatisticMonthly: (
    params: IGetStatisticMonthlyParams
  ) => Promise<IBaseResponse<IGetStatisticMonthlyResponse>>;

  getStatisticDays: (
    params: IGetStatisticDaysParams
  ) => Promise<IBaseResponse<IGetStatisticDaysResponse>>;
};
