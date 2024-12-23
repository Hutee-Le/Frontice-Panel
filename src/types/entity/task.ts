export type ITaskEntity = {
  id: string;
  title: string;
  owner: {
    username: string;
    firstname: string;
    lastname: string;
    image: string;
    url: string;
    company: string;
  };
  technical: string[];
  image: string;
  requiredPoint: number;
  shortDes: string;
  joinTotal: number;
  submittedTotal: number;
  expiredAt: number;
  created_at: number;
  updated_at: number;
  sourceLink: string;
  figmaLink: string;
  reports: {
    id: string;
    reportBy: {
      username: string;
      firstname: string;
      lastname: string;
      image: string;
      gold_account: boolean;
      url: string;
    };
    reason: string;
    created_at: number;
    updated_at: number;
  }[];
};
