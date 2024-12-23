import {
  ISolutionFeedbackEntity,
  ISolutionFeedbackRespondedEntity,
} from "../../entity/solution";

export interface IGetAllSolutionFeedbackResponse {
  solutions: ISolutionFeedbackEntity[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
}

export interface IGetAllSolutionFeedbackRespondedResponse {
  solutions: ISolutionFeedbackRespondedEntity[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
}
