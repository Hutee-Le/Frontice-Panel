import { IBaseResponse } from "../../base/response";
import { IGetAllSolutionOfTaskeeParams } from "../../request/global";
import { IGetAllSolutionOfTaskeeResponse } from "../../response/global";
import { IGetAllTaskResponse } from "../../response/task";

export type IGlobalService = {
  getAllSolutionOfTaskee: (
    params: IGetAllSolutionOfTaskeeParams,
  ) => Promise<IBaseResponse<IGetAllSolutionOfTaskeeResponse>>;

  getAllTaskNewOfTasker: (params: {
    taskerId: string;
  }) => Promise<IBaseResponse<IGetAllTaskResponse>>;

  getAllTaskOldOfTasker: (params: {
    taskerId: string;
  }) => Promise<IBaseResponse<IGetAllTaskResponse>>;
};
