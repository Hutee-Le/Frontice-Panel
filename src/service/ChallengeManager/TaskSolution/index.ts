import axiosClient from "../../../axios/axiosClient";
import constantChallengeManagerApi from "../../../constants/api/challengeManager";
import {
  IGetAllTaskSolutionParams,
  IGetDetailsTaskSolutionParams,
  IGetSolutionByTaskIdParams,
} from "../../../types/request/solution";
import { ITaskSolutionService } from "../../../types/services/taskSolutionService";

const taskSolutionService: ITaskSolutionService = {
  getAll: (params: IGetAllTaskSolutionParams) => {
    const { page, perPage } = params;
    return axiosClient.get(
      `${constantChallengeManagerApi.taskSolution.getAll}?page=${page}&per_page=${perPage}`,
    );
  },

  getByIdTask: (params: IGetSolutionByTaskIdParams) => {
    const { taskId, page = 1, perPage = 10 } = params;
    return axiosClient.get(
      `${constantChallengeManagerApi.taskSolution.getByTaskId}/${taskId}/solutions?page=${page}&per_page=${perPage}`,
    );
  },

  getDetails: (params: IGetDetailsTaskSolutionParams) => {
    const { solutionId } = params;
    return axiosClient.get(
      `${constantChallengeManagerApi.taskSolution.getDetails}/${solutionId}`,
    );
  },
};

export default taskSolutionService;
