import axiosClient from "../../axios/axiosClient";
import { IGetAllSolutionOfTaskeeParams } from "../../types/request/global";
import { IGlobalService } from "../../types/services/global";

const globalService: IGlobalService = {
  getAllSolutionOfTaskee: (params: IGetAllSolutionOfTaskeeParams) => {
    const { taskeeId } = params;
    return axiosClient.get(
      `taskee/challenge-solutions/${taskeeId}?per_page=20`,
    );
  },

  getAllTaskNewOfTasker: (params) => {
    const { taskerId } = params;
    return axiosClient.get(
      `admin/tasks?filter[]=owner&owner=${taskerId}&status=new`,
    );
  },

  getAllTaskOldOfTasker: (params) => {
    const { taskerId } = params;
    return axiosClient.get(
      `admin/tasks?filter[]=owner&owner=${taskerId}&status=old`,
    );
  },
};

export default globalService;
