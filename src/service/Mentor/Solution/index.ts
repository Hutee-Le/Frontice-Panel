import axiosClient from "../../../axios/axiosClient";
import constantMentorApi from "../../../constants/api/mentor";
import {
  IFeedbackSolutionParams,
  IFeedbackSolutionRequest,
  IGetAllSolutionFeedbackParams,
} from "../../../types/request/mentor/solutionFeedback";
import ISolutionMentorService from "../../../types/services/mentor/solution";

const solutionService: ISolutionMentorService = {
  getAll: (params: IGetAllSolutionFeedbackParams) => {
    const { page, per_page, levels = null, typeSolution = null } = params;

    const paramsFilter: string[] = [];

    if (typeSolution) {
      paramsFilter.push(`filter[]=${typeSolution}`);
    }

    if (levels) {
      const levelValues = levels.map((level) => `level[]=${level}`);
      paramsFilter.push(`filter[]=level&${levelValues.join("&")}`);
    }

    return axiosClient.get(
      `${constantMentorApi.solution.getAll}?page=${page}&per_page=${per_page}&${paramsFilter.join("&")}`,
    );
  },

  feedback: (
    data: IFeedbackSolutionRequest,
    params: IFeedbackSolutionParams,
  ) => {
    const { solutionId } = params;
    return axiosClient.post(
      `${constantMentorApi.solution.feedback}/${solutionId}`,
      data,
    );
  },

  responded: (params: IGetAllSolutionFeedbackParams) => {
    const { page, per_page } = params;
    return axiosClient.get(
      `${constantMentorApi.solution.getAll}/feedback?page=${page}&per_page=${per_page}`,
    );
  },
};

export default solutionService;
