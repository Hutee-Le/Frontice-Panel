import { IBaseResponse } from "../base/response";
import {
  IGetAllTaskeeInChallengeParams,
  IGetTaskeeProfileParams,
} from "../request/taskee";
import {
  IGetAllTaskeeInChallengeResponse,
  IGetProfileTaskeeResponse,
} from "../response/taskee";

export interface ITaskeeService {
  getAllTaskeeInChallenge: (
    params: IGetAllTaskeeInChallengeParams,
  ) => Promise<IBaseResponse<IGetAllTaskeeInChallengeResponse>>;

  getProfile: (
    params: IGetTaskeeProfileParams,
  ) => Promise<IBaseResponse<IGetProfileTaskeeResponse>>;
}
