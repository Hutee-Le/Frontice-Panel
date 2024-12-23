import statisticService from './Statistic';
import subscriptionService from './Subscription';
import rootTaskerService from './Tasker';
import userSerivce from './User';

const rootService = {
  tasker: rootTaskerService,
  user: userSerivce,
  subscription: subscriptionService,
  statistic: statisticService,
};

export default rootService;
