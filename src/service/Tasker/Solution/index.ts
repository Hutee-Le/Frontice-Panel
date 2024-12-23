import axiosClient from "../../../axios/axiosClient";
import constantTaskerApi from "../../../constants/api/tasker";
import {
  ICreateCommentRequest,
  IEditCommentParams,
  IEditCommentRequest,
  IGetAllByTaskIdParams,
  IGetByIdParam,
  IGetCommentParams,
  IRemoveCommentParams,
} from "../../../types/request/tasker/solution";
import { ITaskSolutionService } from "../../../types/services/tasker/solution";

const taskSolutionService: ITaskSolutionService = {
  getById: (params: IGetByIdParam) => {
    const { taskId } = params;
    return axiosClient.get(
      `/${constantTaskerApi.taskSolution.getById}/${taskId}`,
    );
  },

  getAllByTaskId: (params: IGetAllByTaskIdParams) => {
    const { taskId, page, pageSize } = params;
    return axiosClient.get(
      `/${constantTaskerApi.taskSolution.getAllByTaskId}/${taskId}?page=${page}&per_page=${pageSize}`,
    );
  },

  getComments: (params: IGetCommentParams) => {
    const { taskSolutionId } = params;
    return axiosClient.get(
      `/${constantTaskerApi.taskSolution.getComments}/${taskSolutionId}`,
    );
  },

  editComment: (params: IEditCommentParams, data: IEditCommentRequest) => {
    const { commentId } = params;
    return axiosClient.put(
      `/${constantTaskerApi.taskSolution.editComment}/${commentId}`,
      data,
    );
  },

  removeComment: (params: IRemoveCommentParams) => {
    const { commentId } = params;
    return axiosClient.delete(
      `/${constantTaskerApi.taskSolution.removeComment}/${commentId}`,
    );
  },

  createComment: (data: ICreateCommentRequest) => {
    return axiosClient.post(
      `/${constantTaskerApi.taskSolution.createComment}`,
      data,
    );
  },
};

export default taskSolutionService;
