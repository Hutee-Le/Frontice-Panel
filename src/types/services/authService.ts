import { IBaseResponse } from "../base/response";
import {
  IChangePasswordRequest,
  IRefreshTokenRequest,
  IRegisterTaskerRequest,
  IRemoveFileRequest,
  ISendOTPRequest,
  IUpdateProfileMentorRequest,
  IUpdateProfileRequest,
  IVerifyOtpParams,
  IVerifyOtpRequest,
} from "../request/auth";
import { ILoginRequest } from "../request/login";
import {
  IRefreshTokenResponse,
  IRegisterTaskerResponse,
  IUpdateProfileResponse,
} from "../response/auth";
import { IInfoMeResponse } from "../response/info";
import { ILoginResponse } from "../response/login";

export type IAuthService = {
  login: (data: ILoginRequest) => Promise<IBaseResponse<ILoginResponse>>;
  registerTasker: (
    data: IRegisterTaskerRequest,
  ) => Promise<IBaseResponse<IRegisterTaskerResponse>>;
  verifyOtp: (
    data: IVerifyOtpRequest,
    params: IVerifyOtpParams,
  ) => Promise<IBaseResponse<null>>;
  infoMe: () => Promise<IBaseResponse<IInfoMeResponse>>;
  refreshToken: (
    data: IRefreshTokenRequest,
  ) => Promise<IBaseResponse<IRefreshTokenResponse>>;
  logout: () => Promise<IBaseResponse<null>>;
  updateProfile: (
    data: IUpdateProfileRequest | IUpdateProfileMentorRequest,
  ) => Promise<IBaseResponse<IUpdateProfileResponse>>;
  removeFile: (data: IRemoveFileRequest) => Promise<IBaseResponse<null>>;

  changePassword: (
    data: IChangePasswordRequest,
  ) => Promise<IBaseResponse<null>>;

  sendOTP: (data: ISendOTPRequest) => Promise<IBaseResponse<null>>;
};
