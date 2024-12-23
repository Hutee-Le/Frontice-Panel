export type IGetAllTaskParams = {
  page?: string | number;
  per_page?: string | number;
};

export type IGetDetailsTaskParams = {
  taskId: string;
};

export type IGetAllTaskReportParams = {
  page?: string | number;
  per_page?: string | number;
};

export type IValidTaskReportRequest = {
  taskId: string;
};

export type IInValidTaskReportRequest = {
  taskId: string;
};
