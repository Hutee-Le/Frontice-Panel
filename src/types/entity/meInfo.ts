import { RoleType } from "../base/role";

export type IMeInfo = {
  id: string;
  username: string;
  email: string;
  role: string;
  fullname?: string;
  firstLogin: boolean;
  image: string;
  adminRole?: RoleType;
  createdAt: number;
  company?: string;
  firstname?: string;
  lastname?: string;
  bio?: string;
  phone?: string;
};

export type IMentorInfoEntity = IMeInfo;
