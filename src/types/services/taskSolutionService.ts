import { IBaseResponse } from "../base/response";
import {
  IGetAllTaskSolutionParams,
  IGetDetailsTaskSolutionParams,
  IGetSolutionByTaskIdParams,
} from "../request/solution";
import {
  IGetAllTaskSolutionResponse,
  IGetDetailsTaskSolutionResponse,
  IGetSolutionsByTaskIdResponse,
} from "../response/soltuion";

export type ITaskSolutionService = {
  getAll: (
    params: IGetAllTaskSolutionParams,
  ) => Promise<IBaseResponse<IGetAllTaskSolutionResponse>>;

  getByIdTask: (
    params: IGetSolutionByTaskIdParams,
  ) => Promise<IBaseResponse<IGetSolutionsByTaskIdResponse>>;

  getDetails: (
    params: IGetDetailsTaskSolutionParams,
  ) => Promise<IBaseResponse<IGetDetailsTaskSolutionResponse>>;
};
