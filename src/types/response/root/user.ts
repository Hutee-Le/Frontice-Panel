export type IUserTaskeeEntity = {
  id: string;
  username: string;
  email: string;
  role: "taskee";
  firstname: string;
  lastname: string;
  phone: string;
  image: string;
  bio: string;
  cv: string;
  github: string;
  point: number;
  challengeJoined: number;
  pendingChallenges: number;
  submittedChallenges: number;
  gold_account: boolean;
  goldExpires: string | null;
  createdAt: number;
};

export type IUserEmployeeEntity = {
  id: string;
  username: string;
  email: string;
  role: string;
  fullname: string;
  firstLogin: boolean;
  image: string | null;
  challengeCreated?: number;
  adminRole: "challenge" | "mentor" | "root";
  createdAt: number;
};

export type IUserTaskerEntity = {
  id: string;
  username: string;
  email: string;
  role: "tasker";
  firstname: string;
  lastname: string;
  phone: string;
  image: string;
  bio: string;
  company: string;
  createdAt: number;
};

export type IGetAllTaskeeUserResponse = {
  taskee: IUserTaskeeEntity[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};

export type IGetAllEmployeeUserResponse = {
  admin: IUserEmployeeEntity[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};

export type IGetAllTaskerUserResponse = {
  tasker: IUserTaskerEntity[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};
