import { useMutation, useQueryClient } from "@tanstack/react-query";
import challengeManagerService from "../../../../service/ChallengeManager/challengeManagerService";
import { ICreateChallengeRequest } from "../../../../types/request/challenge";
import { constantChallengeManagerQueryKey } from "../../../../constants/queryKey/challengeManager";

interface useUploadChallengePageLogicProps {
  mutationCreateChallengeParams?: {
    onSuccess: () => void;
    onError: () => void;
  };
}

const useUploadChallengePageLogic = ({
  mutationCreateChallengeParams,
}: useUploadChallengePageLogicProps) => {
  const queryClient = useQueryClient();
  const mutationCreateChallenge = useMutation({
    mutationKey: ["upload_challenge"],
    mutationFn: async (data: ICreateChallengeRequest) => {
      return challengeManagerService.challenge.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          constantChallengeManagerQueryKey.challenge.myChallenges,
          constantChallengeManagerQueryKey.challenge.allChallenges,
        ],
      });
      if (mutationCreateChallengeParams?.onSuccess) {
        return mutationCreateChallengeParams.onSuccess;
      }
    },
    onError: () => {
      if (mutationCreateChallengeParams?.onError) {
        return mutationCreateChallengeParams.onError;
      }
    },
  });

  return {
    mutationCreateChallenge,
  };
};

export default useUploadChallengePageLogic;
