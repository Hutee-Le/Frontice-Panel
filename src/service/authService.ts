import axiosClient from "../axios/axiosClient";
import { constantAuthApi } from "../constants/api/auth";
import {
  IChangePasswordRequest,
  IRefreshTokenRequest,
  IRegisterTaskerRequest,
  IRemoveFileRequest,
  ISendOTPRequest,
  IVerifyOtpParams,
  IVerifyOtpRequest,
} from "../types/request/auth";
import { ILoginRequest } from "../types/request/login";
import { IAuthService } from "../types/services/authService";

const DEFAULT_URL_API = "auth";

const authService: IAuthService = {
  login: (data: ILoginRequest) => {
    return axiosClient.post(
      `/${DEFAULT_URL_API}/${constantAuthApi.login}`,
      data,
    );
  },

  registerTasker: (data: IRegisterTaskerRequest) => {
    return axiosClient.post(
      `/${DEFAULT_URL_API}/${constantAuthApi.register}`,
      data,
    );
  },

  verifyOtp: (data: IVerifyOtpRequest, params: IVerifyOtpParams) => {
    const { emailVerify } = params;
    return axiosClient.post(
      `/${DEFAULT_URL_API}/${constantAuthApi.verifyOtp}?email=${emailVerify}`,
      data,
    );
  },

  infoMe: () => {
    return axiosClient.get(`/${DEFAULT_URL_API}/me`);
  },

  refreshToken: (data: IRefreshTokenRequest) => {
    return axiosClient.post(
      `${DEFAULT_URL_API}/${constantAuthApi.refresh}`,
      data,
    );
  },

  logout: () => {
    return axiosClient.post(`${DEFAULT_URL_API}/${constantAuthApi.logout}`);
  },

  updateProfile: (data) => {
    return axiosClient.put(constantAuthApi.updateProfile, data);
  },

  removeFile: (data: IRemoveFileRequest) => {
    return axiosClient.delete(
      `${DEFAULT_URL_API}/${constantAuthApi.removeFile}`,
      {
        data,
      },
    );
  },

  changePassword: (data: IChangePasswordRequest) => {
    return axiosClient.put(
      `${DEFAULT_URL_API}/${constantAuthApi.changePassword}`,
      data,
    );
  },

  sendOTP: (data: ISendOTPRequest) => {
    return axiosClient.post(constantAuthApi.sendOTP, data);
  },
};

export default authService;
