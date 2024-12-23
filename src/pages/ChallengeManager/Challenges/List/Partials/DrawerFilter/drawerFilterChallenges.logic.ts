import { useQuery } from "@tanstack/react-query";
import challengeManagerService from "../../../../../../service/ChallengeManager/challengeManagerService";

const useDrawerFilterChallengesLogic = () => {
  const queryFilterInformation = useQuery({
    queryKey: [],
    queryFn: async () => {
      const response =
        await challengeManagerService.challenge.getFilterInforamtion();
      const responseData = response.data;
      return responseData;
    },
  });

  return { queryFilterInformation };
};

export default useDrawerFilterChallengesLogic;
