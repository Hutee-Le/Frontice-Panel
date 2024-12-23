import axiosClient from "../../../axios/axiosClient";
import constantTaskeeApi from "../../../constants/api/challengeManager/taskee";
import {
  IGetAllTaskeeInChallengeParams,
  IGetTaskeeProfileParams,
} from "../../../types/request/taskee";
import { ITaskeeService } from "../../../types/services/taskeeService";

const taskeeService: ITaskeeService = {
  getAllTaskeeInChallenge: (params: IGetAllTaskeeInChallengeParams) => {
    const { challengeId, query, page = 1, perPage = 10 } = params;
    return axiosClient.get(
      `${constantTaskeeApi.getTaskeeInChallenge}/${challengeId}/taskees?page=${page}&per_page=${perPage}&${query !== "all" ? `query=${query}` : ""}`,
    );
  },

  getProfile: (params: IGetTaskeeProfileParams) => {
    const { usernameTaskee } = params;
    return axiosClient.get(`${constantTaskeeApi.getProfile}/${usernameTaskee}`);
  },
};

export default taskeeService;
