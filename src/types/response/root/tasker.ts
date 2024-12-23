export type IRootTaskerApprove = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  image: string;
  url: string;
  company: string;
  isApproved: boolean;
  createdAt: number;
  updatedAt: number;
};

export type IGetAllRequestApproveTaskerResponse = {
  taskers: IRootTaskerApprove[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};
