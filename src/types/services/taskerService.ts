import { IBaseResponse } from "../base/response";
import { IGetProfileTaskerParams } from "../request/tasker";
import { IGetProfileTaskerResponse } from "../response/tasker";

export type ITaskerService = {
  getProfile: (
    params: IGetProfileTaskerParams,
  ) => Promise<IBaseResponse<IGetProfileTaskerResponse>>;
};
