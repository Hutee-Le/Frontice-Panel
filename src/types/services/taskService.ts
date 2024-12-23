import { IBaseResponse } from "../base/response";
import {
  IGetAllTaskParams,
  IGetAllTaskReportParams,
  IGetDetailsTaskParams,
  IInValidTaskReportRequest,
  IValidTaskReportRequest,
} from "../request/task";
import {
  IGetAllTaskReportResponse,
  IGetAllTaskResponse,
  IGetTaskDetailsResponse,
} from "../response/task";

export type ITaskService = {
  getAll: (
    params: IGetAllTaskParams,
  ) => Promise<IBaseResponse<IGetAllTaskResponse>>;

  getDetails: (
    params: IGetDetailsTaskParams,
  ) => Promise<IBaseResponse<IGetTaskDetailsResponse>>;

  getAllReports: (
    params: IGetAllTaskReportParams,
  ) => Promise<IBaseResponse<IGetAllTaskReportResponse>>;

  validTaskReport: (
    data: IValidTaskReportRequest,
  ) => Promise<IBaseResponse<null>>;
  inValidTaskReport: (
    data: IInValidTaskReportRequest,
  ) => Promise<IBaseResponse<null>>;
};
