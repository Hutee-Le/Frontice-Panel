import { IOwnerChallenger } from "./owner";

export type IChallengeEntity = {
  id: string;
  title: string;
  technical: string[];
  owner: IOwnerChallenger;
  image: string;
  level: string;
  requiredPoint: number;
  point: number;
  shortDes: string;
  longDes: string;
  premium: boolean;
  enoughPoint: boolean;
  joinTotal: number;
  submittedTotal: number;
  submittedRate: number;
  created_at: number;
  updated_at: number;
};
