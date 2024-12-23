import axiosClient from "../../../axios/axiosClient";
import constantChallengeManagerApi from "../../../constants/api/challengeManager";
import {
  IGetAllTaskParams,
  IGetAllTaskReportParams,
  IGetDetailsTaskParams,
  IInValidTaskReportRequest,
  IValidTaskReportRequest,
} from "../../../types/request/task";
import { ITaskService } from "../../../types/services/taskService";

const taskService: ITaskService = {
  getAll: (params: IGetAllTaskParams) => {
    const { page = 1, per_page = 10 } = params;
    return axiosClient.get(
      `${constantChallengeManagerApi.task.getAll}?page=${page}&per_page=${per_page}`,
    );
  },

  getDetails: (params: IGetDetailsTaskParams) => {
    const { taskId } = params;
    return axiosClient.get(
      `${constantChallengeManagerApi.task.details}/${taskId}`,
    );
  },

  getAllReports: (params: IGetAllTaskReportParams) => {
    const { page = 1, per_page = 10 } = params;
    return axiosClient.get(
      `${constantChallengeManagerApi.task.getAllReports}?page=${page}&per_page=${per_page}`,
    );
  },

  validTaskReport: (data: IValidTaskReportRequest) => {
    return axiosClient.put(constantChallengeManagerApi.task.validTaskReport, {
      task_id: data.taskId,
    });
  },

  inValidTaskReport: (data: IInValidTaskReportRequest) => {
    return axiosClient.put(constantChallengeManagerApi.task.inValidTaskReport, {
      task_id: data.taskId,
    });
  },
};

export default taskService;
