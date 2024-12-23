import { IBaseResponse } from "../../base/response";
import {
  ICreateCommentRequest,
  IEditCommentParams,
  IEditCommentRequest,
  IGetAllByTaskIdParams,
  IGetByIdParam,
  IGetCommentParams,
  IRemoveCommentParams,
} from "../../request/tasker/solution";
import {
  IGetAllByTaskIdResponse,
  IGetByIdResponse,
  IGetCommentResponse,
} from "../../response/tasker/solution";

export type ITaskSolutionService = {
  getAllByTaskId: (
    params: IGetAllByTaskIdParams,
  ) => Promise<IBaseResponse<IGetAllByTaskIdResponse>>;

  getById: (params: IGetByIdParam) => Promise<IBaseResponse<IGetByIdResponse>>;

  getComments: (
    params: IGetCommentParams,
  ) => Promise<IBaseResponse<IGetCommentResponse>>;

  editComment: (
    params: IEditCommentParams,
    data: IEditCommentRequest,
  ) => Promise<IBaseResponse<null>>;

  removeComment: (params: IRemoveCommentParams) => Promise<IBaseResponse<null>>;

  createComment: (
    params: ICreateCommentRequest,
  ) => Promise<IBaseResponse<null>>;
};
