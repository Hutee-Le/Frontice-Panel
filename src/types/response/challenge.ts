import { IChallengeEntity } from "../entity/challenge";

export type IGetAllChallengeResponse = {
  challenges: IChallengeEntity[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};

export type IUploadImageChallengeResponse = {
  path: string;
};

export type IUploadSourceChallengeResponse = {
  path: string;
};

export type IUploadFigmaChallengeResponse = {
  path: string;
};

export type IGetChallengeDetailsResponse = IChallengeEntity;

type ILevelFilterInforamtion = {
  id: number;
  name: string;
  default_point: number;
  required_point: number;
  created_at: string;
  updated_at: string;
};

type ITechiniquesFilterInforamtion = {
  name: string;
  count: number;
};

type IOwnerFilterInformation = {
  id: string;
  username: string;
  email: string;
  role: string;
  fullname: string;
  image: string;
  adminRole: string;
  createdAt: number;
  created_count: number;
};

export type IGetFilterInforamtion = {
  levels: ILevelFilterInforamtion[];
  techniques: ITechiniquesFilterInforamtion[];
  owners: IOwnerFilterInformation[];
  point: {
    min: number;
    max: number;
  };
  premium: number;
  created_at: {
    min: number;
    max: number;
  };
};
