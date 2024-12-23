import { IBaseResponse } from "../base/response";
import {
  IGetAllByChallengeIdParams,
  IGetAllSolutionParams,
  IGetDetailsSolutionParams,
} from "../request/solution";
import {
  IGetAllByChallengeIdResponse,
  IGetAllSolutionResponse,
  IGetDetailsSolutionResponse,
} from "../response/soltuion";

export type ISolutionService = {
  getAll: (
    params: IGetAllSolutionParams,
  ) => Promise<IBaseResponse<IGetAllSolutionResponse>>;
  getDetails: (
    params: IGetDetailsSolutionParams,
  ) => Promise<IBaseResponse<IGetDetailsSolutionResponse>>;
  getReport: () => Promise<IBaseResponse<IGetAllSolutionResponse>>;

  getAllByChallengeId: (
    params: IGetAllByChallengeIdParams,
  ) => Promise<IBaseResponse<IGetAllByChallengeIdResponse>>;
};
