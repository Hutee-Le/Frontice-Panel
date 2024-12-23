import axiosClient from "../../../axios/axiosClient";
import constantRootApi from "../../../constants/api/root";
import {
  ICreateEmployeeUserRequest,
  IGetAllUserByRoleParams,
  IRemoveUserParams,
} from "../../../types/request/root/user";
import { IUserServices } from "../../../types/services/root/user";

const userSerivce: IUserServices = {
  getAllUserTaskee: (params: IGetAllUserByRoleParams) => {
    const { pageSize, page } = params;
    return axiosClient.get(
      `${constantRootApi.user.getAllUserByRole}/taskees?page=${page}&per_page=${pageSize}`,
    );
  },
  getAllUserTasker: (params: IGetAllUserByRoleParams) => {
    const { page, pageSize } = params;
    return axiosClient.get(
      `${constantRootApi.user.getAllUserByRole}/taskers?page=${page}&per_page=${pageSize}`,
    );
  },

  getAllUserEmployee: (params: IGetAllUserByRoleParams) => {
    const { page, pageSize } = params;
    return axiosClient.get(
      `${constantRootApi.user.getAllUserByRole}/admins?page=${page}&per_page=${pageSize}`,
    );
  },

  removeUser: (params: IRemoveUserParams) => {
    const { userId } = params;
    return axiosClient.delete(`${constantRootApi.user.removeUser}/${userId}`);
  },

  createEmployeeUser: (data: ICreateEmployeeUserRequest) => {
    return axiosClient.post(`${constantRootApi.user.createEmployeeUser}`, {
      ...data,
      role: "admin",
    });
  },
};

export default userSerivce;
