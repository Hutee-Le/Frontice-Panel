import axiosClient from "../../../axios/axiosClient";
import constantRootApi from "../../../constants/api/root";
import {
  IApproveTaskerRequest,
  IGetAllRequestApproveTaskerParams,
  IRemoveTaskerParams,
} from "../../../types/request/root/tasker";
import { IRootTaskerService } from "../../../types/services/root/tasker";

const rootTaskerService: IRootTaskerService = {
  getAllRequestApprove: (params: IGetAllRequestApproveTaskerParams) => {
    const { page = 1, perPage = 10 } = params;
    return axiosClient.get(
      `${constantRootApi.tasker.getAllRequestApprove}?page=${page}&per_page=${perPage}&sort=newest`,
    );
  },
  approve: (data: IApproveTaskerRequest) => {
    return axiosClient.post(`${constantRootApi.tasker.approve}`, data);
  },

  remove: (params: IRemoveTaskerParams) => {
    const { tasker_id } = params;
    return axiosClient.delete(`${constantRootApi.tasker.remove}/${tasker_id}`);
  },
};

export default rootTaskerService;
