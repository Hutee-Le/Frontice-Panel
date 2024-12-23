import axiosClient from "../../../axios/axiosClient";
import constantTaskerApi from "../../../constants/api/tasker";
import { IGetAllFollowerParams } from "../../../types/request/tasker/follower";
import { IFollowerService } from "../../../types/services/tasker/follower";

const followerService: IFollowerService = {
  getAll: (params: IGetAllFollowerParams) => {
    const { page, per_page } = params;
    return axiosClient.get(
      `/${constantTaskerApi.follower.getAll}?page=${page}&per_page=${per_page}`,
    );
  },
};

export default followerService;
