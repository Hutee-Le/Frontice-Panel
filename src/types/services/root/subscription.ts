import { IBaseResponse } from "../../base/response";
import {
  IUpdatePriceSubscriptionParams,
  IUpdatePriceSubscriptionRequest,
} from "../../request/root/subscription";
import { IGetAllSubscriptionResponse } from "../../response/root/subscription";

export type ISubscriptionService = {
  getAllSubscription: () => Promise<IBaseResponse<IGetAllSubscriptionResponse>>;
  updatePrice: (
    params: IUpdatePriceSubscriptionParams,
    data: IUpdatePriceSubscriptionRequest,
  ) => Promise<IBaseResponse<null>>;
};
