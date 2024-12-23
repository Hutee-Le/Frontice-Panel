import {
  ICreateChallengeRequest,
  IDeleteFileChallengeRequest,
  IGetAllChallengeParams,
  IGetChallengeDetailsParams,
  IRemoveChallengeParams,
  IUploadFigmaChallengeRequest,
  IUploadImageChallengeRequest,
  IUploadSourceChallengeRequest,
} from "../request/challenge";
import { IBaseResponse } from "../base/response";
import {
  IGetAllChallengeResponse,
  IGetChallengeDetailsResponse,
  IGetFilterInforamtion,
  IUploadFigmaChallengeResponse,
  IUploadImageChallengeResponse,
  IUploadSourceChallengeResponse,
} from "../response/challenge";

export type IChallengeService = {
  getAll: (
    params: IGetAllChallengeParams,
  ) => Promise<IBaseResponse<IGetAllChallengeResponse>>;
  getDetails: (
    params: IGetChallengeDetailsParams,
  ) => Promise<IBaseResponse<IGetChallengeDetailsResponse>>;

  uploadSource: (
    dataBody: IUploadSourceChallengeRequest,
  ) => Promise<IBaseResponse<IUploadSourceChallengeResponse>>;

  uploadImage: (
    dataBody: IUploadImageChallengeRequest,
  ) => Promise<IBaseResponse<IUploadImageChallengeResponse>>;

  uploadFigma: (
    dataBody: IUploadFigmaChallengeRequest,
  ) => Promise<IBaseResponse<IUploadFigmaChallengeResponse>>;

  remove: (params: IRemoveChallengeParams) => Promise<IBaseResponse<null>>;

  deleteFile: (
    data: IDeleteFileChallengeRequest,
  ) => Promise<IBaseResponse<null>>;

  create: (data: ICreateChallengeRequest) => Promise<IBaseResponse<null>>;

  getFilterInforamtion: () => Promise<IBaseResponse<IGetFilterInforamtion>>;
};
