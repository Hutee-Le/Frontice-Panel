import { IBaseResponse } from "../../base/response";
import {
  IFeedbackSolutionParams,
  IFeedbackSolutionRequest,
  IGetAllSolutionFeedbackParams,
} from "../../request/mentor/solutionFeedback";
import {
  IGetAllSolutionFeedbackRespondedResponse,
  IGetAllSolutionFeedbackResponse,
} from "../../response/mentor/solutionFeedback";

type ISolutionMentorService = {
  getAll: (
    params: IGetAllSolutionFeedbackParams,
  ) => Promise<IBaseResponse<IGetAllSolutionFeedbackResponse>>;

  feedback: (
    data: IFeedbackSolutionRequest,
    params: IFeedbackSolutionParams,
  ) => Promise<IBaseResponse<null>>;

  responded: (
    params: IGetAllSolutionFeedbackParams,
  ) => Promise<IBaseResponse<IGetAllSolutionFeedbackRespondedResponse>>;
};

export default ISolutionMentorService;
