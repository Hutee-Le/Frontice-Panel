export type IGetAllByTaskIdParams = {
  taskId: string;
  page?: string | number;
  pageSize?: string | number;
};

export type IGetByIdParam = {
  taskId: string;
};

export type IGetCommentParams = {
  taskSolutionId: string;
};

export type ICreateCommentRequest = {
  content: string;
  task_solution_id: string;
  parent_id: string;
};

export type IRemoveCommentParams = {
  commentId: string;
};

export type IEditCommentParams = {
  commentId: string;
};

export type IEditCommentRequest = {
  content: string;
};
