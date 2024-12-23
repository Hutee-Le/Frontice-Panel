export type IGetAllSolutionParams = {
  per_page?: string | number;
  page?: string | number;
};

export type IGetDetailsSolutionParams = {
  solutionId: string;
};

export type IGetAllByChallengeIdParams = { challengeId: string };

export type IGetAllTaskSolutionParams = {
  page?: string | number;
  perPage?: string | number;
};

export type IGetSolutionByTaskIdParams = {
  page?: string | number;
  perPage?: string | number;
  taskId: string;
};

export type IGetDetailsTaskSolutionParams = {
  solutionId: string;
};
