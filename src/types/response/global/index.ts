import { ISolutionEntity } from "../../entity/solution";

export type IGetAllSolutionOfTaskeeResponse = {
  solutions: ISolutionEntity[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};
