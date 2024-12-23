import { ISubscriptionEntity } from "../../entity/subscription";

export type IGetAllSubscriptionResponse = {
  services: ISubscriptionEntity[][];
};
