import { useQuery } from "@tanstack/react-query";
import { IGetAllSolutionParams } from "../../../../types/request/solution";
import challengeManagerService from "../../../../service/ChallengeManager/challengeManagerService";

interface IUseSolutionListLogicParams {
  querySoltuionListParams?: IGetAllSolutionParams;
}

const useSolutionListLogic = ({
  querySoltuionListParams = {},
}: IUseSolutionListLogicParams) => {
  const querySolutionList = useQuery({
    //TODO: Implement constant queryKey
    queryKey: [
      "solution_list",
      querySoltuionListParams?.per_page || 10,
      querySoltuionListParams?.page || 1,
    ],
    queryFn: async () => {
      const resposne = await challengeManagerService.solution.getAll(
        querySoltuionListParams,
      );
      return resposne.data;
    },
  });

  return {
    querySolutionList,
  };
};

export default useSolutionListLogic;
