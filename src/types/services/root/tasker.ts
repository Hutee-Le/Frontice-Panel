import { IBaseResponse } from "../../base/response";
import {
  IApproveTaskerRequest,
  IGetAllRequestApproveTaskerParams,
  IRemoveTaskerParams,
} from "../../request/root/tasker";
import { IGetAllRequestApproveTaskerResponse } from "../../response/root/tasker";

export type IRootTaskerService = {
  getAllRequestApprove: (
    params: IGetAllRequestApproveTaskerParams,
  ) => Promise<IBaseResponse<IGetAllRequestApproveTaskerResponse>>;

  approve: (data: IApproveTaskerRequest) => Promise<IBaseResponse<null>>;
  remove: (params: IRemoveTaskerParams) => Promise<IBaseResponse<null>>;
};
