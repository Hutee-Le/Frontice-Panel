import axiosClient from "../../../axios/axiosClient";
import constantChallengeManagerApi from "../../../constants/api/challengeManager";
import {
  IGetAllByChallengeIdParams,
  IGetAllSolutionParams,
  IGetDetailsSolutionParams,
} from "../../../types/request/solution";
import { ISolutionService } from "../../../types/services/solutionService";

const solutionService: ISolutionService = {
  getAll: (params: IGetAllSolutionParams) => {
    const { page = 1, per_page = 10 } = params;
    return axiosClient.get(
      `${constantChallengeManagerApi.solution.getAll}?page=${page}&per_page=${per_page}`,
    );
  },

  getDetails: (params: IGetDetailsSolutionParams) => {
    const { solutionId } = params;
    return axiosClient.get(
      `${constantChallengeManagerApi.solution.details}/${solutionId}`,
    );
  },

  getReport: () => {
    return axiosClient.get(
      `${constantChallengeManagerApi.solution.getReports}`,
    );
  },

  getAllByChallengeId: (params: IGetAllByChallengeIdParams) => {
    const { challengeId } = params;
    return axiosClient.get(
      `${constantChallengeManagerApi.solution.getAllByChallengeId}/${challengeId}/solutions`,
    );
  },
};

export default solutionService;
