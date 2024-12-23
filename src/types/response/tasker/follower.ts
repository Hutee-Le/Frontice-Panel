type IFollower = {
  username: string;
  firstname: string;
  lastname: string;
  image: string | null;
  gold_account: boolean;
  url: string;
};

export type IGetAllFollowerResponse = {
  taskee: IFollower[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};
