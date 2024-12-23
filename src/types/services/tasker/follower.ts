import { IBaseResponse } from "../../base/response";
import { IGetAllFollowerParams } from "../../request/tasker/follower";
import { IGetAllFollowerResponse } from "../../response/tasker/follower";

export type IFollowerService = {
  getAll: (
    params: IGetAllFollowerParams,
  ) => Promise<IBaseResponse<IGetAllFollowerResponse>>;
};
