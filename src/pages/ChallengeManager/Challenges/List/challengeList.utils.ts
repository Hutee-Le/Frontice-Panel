import { IGetAllChallengeParams } from "../../../../types/request/challenge";

const generateQueryKeyChallenges: (
  mainQueryKey: string,
  params: IGetAllChallengeParams,
) => string[] = (mainQueryKey, params) => {
  const { page = 1, perPage = 10, get = null } = params;
  return [mainQueryKey, page, perPage, get] as string[];
};

export default generateQueryKeyChallenges;
