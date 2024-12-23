import StatisticPage from "./Statistic/Statistic";
import { SubscriptionManagement } from "./Subscription";
import { TaskerManagement } from "./Tasker";
import { UserManagement } from "./User";

const RootController = () => {
  return null;
};

RootController.User = UserManagement;
RootController.Tasker = TaskerManagement;
RootController.Subscription = SubscriptionManagement;
RootController.Statistic = StatisticPage

export default RootController;
