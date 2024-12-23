import axiosClient from "../../../axios/axiosClient";
import constantChallengeManagerApi from "../../../constants/api/challengeManager";
import { IGetProfileTaskerParams } from "../../../types/request/tasker";
import { ITaskerService } from "../../../types/services/taskerService";

const taskerSerivce: ITaskerService = {
  getProfile: (params: IGetProfileTaskerParams) => {
    const { username } = params;
    return axiosClient.get(
      `${constantChallengeManagerApi.tasker.getProfile}/${username}`,
    );
  },
};

export default taskerSerivce;
