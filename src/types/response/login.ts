import { IJwtToken } from "../entity/JwtToken";

export type ILoginResponse = IJwtToken & {
  token_type: string;
  expires_in: number;
};
