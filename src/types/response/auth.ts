import { IJwtToken } from "../entity/JwtToken";
import { IMeInfo } from "../entity/meInfo";

export type IRefreshTokenResponse = IJwtToken & {
  token_type: string;
  expires_in: number;
};

export type IUpdateProfileResponse = IMeInfo;

export type IRegisterTaskerResponse = {
  verify_url: string;
  id: string;
  username: string;
  email: string;
  role: string;
  firstname: string;
  lastname: string;
  phone: string;
  image: string;
  bio: string;
  company: string;
  createdAt: number;
};
