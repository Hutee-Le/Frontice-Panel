export type IRefreshTokenRequest = {
  refreshToken: string;
};

export type IUpdateProfileRequest = {
  username?: string;
  email?: string;
  phone?: string;
  firstname?: string;
  lastname?: string;
  cv?: string;
  image?: string;
};

export type IUpdateProfileMentorRequest = {
  username?: string;
  email?: string;
  fullname?: string;
  image?: string;
};

export type IUpdateProfileChallengeManagerRequest = {
  username?: string;
  email?: string;
  fullname?: string;
  image?: string;
};

export type IUpdateProfileTaskerRequest = {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  bio: string;
  company: string;
};

export type IRemoveFileRequest = {
  path: string[];
};

export type IChangePasswordRequest = {
  current_password: string;
  password: string;
  password_confirmation: string;
};

export type IRegisterTaskerRequest = {
  username: string;
  email: string;
  password: string;
  phone: string;
  password_confirmation: string;
  firstname: string;
  lastname: string;
  company: string;
  role: "tasker";
};

export type IVerifyOtpRequest = {
  otp: string;
};

export type IVerifyOtpParams = {
  emailVerify: string;
};

export type ISendOTPRequest = {
  email: string;
};
