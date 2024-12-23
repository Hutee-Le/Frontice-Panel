import { ICommentEntity } from "../../entity/comment";
import { ITaskSolutionEntity } from "../../entity/taskSolution";

export type IGetAllByTaskIdResponse = {
  solutions: ITaskSolutionEntity[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};

export type IGetByIdResponse = ITaskSolutionEntity;

export type IGetCommentResponse = {
  comments: ICommentEntity[];
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
};
