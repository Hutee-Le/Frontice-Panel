export type IGetAllSolutionFeedbackParams = {
  page?: string | number;
  per_page?: string | number;
  typeSolution?: "no_feedback" | "mentor_feedback";
  levels?: number[] | string[];
};

export type IFeedbackSolutionRequest = {
  feedback: string;
};

export type IFeedbackSolutionParams = {
  solutionId: string;
};
