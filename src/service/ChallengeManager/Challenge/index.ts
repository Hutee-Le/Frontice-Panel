import axiosClient from "../../../axios/axiosClient";
import constantChallengeManagerApi from "../../../constants/api/challengeManager";
import {
  ICreateChallengeRequest,
  IDeleteFileChallengeRequest,
  IGetAllChallengeParams,
  IGetChallengeDetailsParams,
  IRemoveChallengeParams,
  IUploadFigmaChallengeRequest,
  IUploadImageChallengeRequest,
  IUploadSourceChallengeRequest,
} from "../../../types/request/challenge";
import { IChallengeService } from "../../../types/services/challengeService";

const challengeService: IChallengeService = {
  getAll: (params: IGetAllChallengeParams) => {
    const {
      page = 1,
      sort = "newest",
      perPage = 10,
      get = null,
      filter,
    } = params;
    const paramsFilterArr: string[] = [];
    if (filter) {
      if (filter.levels) {
        const levelsFilterParams = filter.levels.map(
          (level) => `level[]=${level}`,
        );
        paramsFilterArr.push(`filter[]=level&${levelsFilterParams.join("&")}`);
      }

      if (filter.owners) {
        const ownersFilterParams = filter.owners.map(
          (ownerId) => `owner[]=${ownerId}`,
        );

        paramsFilterArr.push(`filter[]=owner&${ownersFilterParams.join("&")}`);
      }

      if (filter.points) {
        paramsFilterArr.push(
          `filter[]=point&min_point=${filter.points[0]}&max_point=${filter.points[1]}`,
        );
      }

      if (filter.technical) {
        const technicalFilterParams = filter.technical.map(
          (technicalItem) => `technical[]=${technicalItem}`,
        );
        paramsFilterArr.push(technicalFilterParams.join("&"));
      }

      if (filter.timeCreated) {
        paramsFilterArr.push(
          `filter[]=created_at&start=${filter.timeCreated[0]}&end=${filter.timeCreated[1]}`,
        );
      }

      if (filter.premium) {
        paramsFilterArr.push(`filter[]=premium`);
      }
    }

    return axiosClient.get(
      `${constantChallengeManagerApi.challenge.getAll}?sort=${sort}&page=${page}&per_page=${perPage}&get=${get}&${paramsFilterArr.join("&")}`,
    );
  },

  getDetails: (params: IGetChallengeDetailsParams) => {
    const { challengeId } = params;
    return axiosClient.get(
      `${constantChallengeManagerApi.challenge.getDetails}/${challengeId}`,
    );
  },

  remove: (params: IRemoveChallengeParams) => {
    const { challengeId } = params;
    return axiosClient.delete(
      `${constantChallengeManagerApi.challenge.remove}/${challengeId}`,
    );
  },

  uploadSource: (dataBody: IUploadSourceChallengeRequest) => {
    const { source } = dataBody;
    const formData = new FormData();
    formData.append("source", source);

    return axiosClient.post(
      constantChallengeManagerApi.challenge.uploadSource,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  },

  uploadFigma: (dataBody: IUploadFigmaChallengeRequest) => {
    const { figma } = dataBody;
    const formData = new FormData();
    formData.append("figma", figma);

    return axiosClient.post(
      constantChallengeManagerApi.challenge.uploadFigma,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  },

  uploadImage: (dataBody: IUploadImageChallengeRequest) => {
    const { image } = dataBody;
    const formData = new FormData();
    formData.append("image", image);

    return axiosClient.post(
      constantChallengeManagerApi.challenge.uploadImage,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  },

  deleteFile: (data: IDeleteFileChallengeRequest) => {
    return axiosClient.delete(
      constantChallengeManagerApi.challenge.removeFile,
      {
        data,
      },
    );
  },

  create: (data: ICreateChallengeRequest) => {
    return axiosClient.post(constantChallengeManagerApi.challenge.create, data);
  },

  getFilterInforamtion: () => {
    return axiosClient.get(
      constantChallengeManagerApi.challenge.getFilterInformation,
    );
  },
};

export default challengeService;
