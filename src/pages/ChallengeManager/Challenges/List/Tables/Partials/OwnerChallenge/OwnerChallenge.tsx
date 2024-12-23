import { FC } from "react";
import { IChallengeEntity } from "../../../../../../../types/entity/challenge";

interface IOwnerChallengeProps {
  owner: IChallengeEntity["owner"];
}

const OwnerChallenge: FC<IOwnerChallengeProps> = ({  }) => {
  return <div>this is owner challenge</div>;
};

export default OwnerChallenge;
