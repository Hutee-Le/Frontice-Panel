export type IGetAllTaskParams = {
  page?: string;
  perPage?: string;
};

export type IGetDetailsTaskParams = {
  taskId: string;
};

export type ICreateTaskRequest = {
  title: string;
  level_id: string;
  required_point: number;
  desc: string;
  short_des: string;
  technical: string[];
  image: string;
  source: string;
  figma: string;
  expired: string;
};

export type IDeleteTaskParams = {
  taskId: string;
};
