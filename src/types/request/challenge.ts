export type IGetAllChallengeParams = {
  sort?: string;
  page?: string | number;
  perPage?: string | number;
  filter?: {
    levels?: string[] | number[];
    owners?: string[] | number[];
    technical?: string[] | number[];
    timeCreated?: string[] | number[];
    points?: number[] | string[];
    premium?: boolean;
  };
  get?: "owner" | "other" | null;
};

export type IRemoveChallengeParams = {
  challengeId: string;
};

export type ICreateChallengeRequest = {
  title: string;
  level_id: string;
  point: number;
  desc: string;
  short_des: string;
  technical: string[];
  image: string;
  source: string;
  figma: string;
  premium: boolean;
};

export type IDeleteFileChallengeRequest = {
  path: string[];
};

export type IUploadSourceChallengeRequest = {
  source: File;
};

export type IUploadFigmaChallengeRequest = {
  figma: File;
};

export type IUploadImageChallengeRequest = {
  image: File;
};

export type IGetChallengeDetailsParams = {
  challengeId: string;
};
