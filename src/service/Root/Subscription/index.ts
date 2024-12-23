import axiosClient from "../../../axios/axiosClient";
import constantRootApi from "../../../constants/api/root";
import {
  IUpdatePriceSubscriptionParams,
  IUpdatePriceSubscriptionRequest,
} from "../../../types/request/root/subscription";
import { ISubscriptionService } from "../../../types/services/root/subscription";

const subscriptionService: ISubscriptionService = {
  getAllSubscription: () => {
    return axiosClient.get(constantRootApi.subscription.getAll);
  },
  updatePrice: (
    params: IUpdatePriceSubscriptionParams,
    data: IUpdatePriceSubscriptionRequest,
  ) => {
    const { subscriptionId } = params;
    return axiosClient.put(
      `${constantRootApi.subscription.updatePrice}/${subscriptionId}`,
      data,
    );
  },
};

export default subscriptionService;
