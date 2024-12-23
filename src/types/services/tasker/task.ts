import { IBaseResponse } from '../../base/response';
import {
  ICreateTaskRequest,
  IDeleteTaskParams,
  IGetAllTaskParams,
  IGetDetailsTaskParams,
} from '../../request/tasker/task';
import {
  IGetAllTaskResponse,
  IGetDetailsTaskResponse,
} from '../../response/tasker/task';

export type ITaskSerivce = {
  getAll: (
    params: IGetAllTaskParams
  ) => Promise<IBaseResponse<IGetAllTaskResponse>>;

  getDetails: (
    params: IGetDetailsTaskParams
  ) => Promise<IBaseResponse<IGetDetailsTaskResponse>>;

  create: (data: ICreateTaskRequest) => Promise<IBaseResponse<null>>;
  delete: (params: IDeleteTaskParams) => Promise<IBaseResponse<null>>;

  update: (
    taskerId: string,
    data: ICreateTaskRequest
  ) => Promise<IBaseResponse<null>>;
};
