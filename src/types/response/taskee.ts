import { ITaskeeEntity } from "../entity/taskee";

export type IGetAllTaskeeInChallengeResponse = {
  taskees: ITaskeeEntity[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};

export type IGetProfileTaskeeResponse = {
  id: string;
  username: string;
  email: string;
  role: string;
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
  goldExpires: string;
  createdAt: number;
};
