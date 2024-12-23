import { IBaseResponse } from "../../base/response";
import {
  ICreateEmployeeUserRequest,
  IGetAllUserByRoleParams,
  IRemoveUserParams,
} from "../../request/root/user";
import {
  IGetAllEmployeeUserResponse,
  IGetAllTaskeeUserResponse,
  IGetAllTaskerUserResponse,
} from "../../response/root/user";

export type IUserServices = {
  getAllUserEmployee: (
    params: IGetAllUserByRoleParams,
  ) => Promise<IBaseResponse<IGetAllEmployeeUserResponse>>;
  getAllUserTaskee: (
    params: IGetAllUserByRoleParams,
  ) => Promise<IBaseResponse<IGetAllTaskeeUserResponse>>;
  getAllUserTasker: (
    params: IGetAllUserByRoleParams,
  ) => Promise<IBaseResponse<IGetAllTaskerUserResponse>>;

  removeUser: (params: IRemoveUserParams) => Promise<IBaseResponse<null>>;

  createEmployeeUser: (
    data: ICreateEmployeeUserRequest,
  ) => Promise<IBaseResponse<null>>;
};
