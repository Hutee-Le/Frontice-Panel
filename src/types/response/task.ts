import { ITaskEntity } from "../entity/task";

export type IGetAllTaskResponse = {
  tasks: ITaskEntity[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};

export type IGetTaskDetailsResponse = ITaskEntity & {
  figmaLink: string;
  sourceLink: string;
};

type ICustomeTask = Omit<
  ITaskEntity,
  | "sourceLink"
  | "figmaLink"
  | "reports"
  | "submittedTotal"
  | "joinTotal"
  | "shortDes"
> & {
  reports: number;
};

export type IGetAllTaskReportResponse = {
  tasks: ICustomeTask[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};
