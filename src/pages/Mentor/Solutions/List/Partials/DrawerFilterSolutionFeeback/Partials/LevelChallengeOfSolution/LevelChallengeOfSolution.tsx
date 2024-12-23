import { FC } from "react";
import { BoxFilter } from "../../../../../../../ChallengeManager/Challenges/List/Partials/DrawerFilter/Partials/BoxFilter";
import { Select, SelectProps } from "antd";
import useDrawerFilterSolutionFeedback from "../../../../../../../../store/DrawerFilterSolutionFeedback/DrawerFilterSolutionFeedbackStore";

const options: SelectProps["options"] = [
  {
    label: "Newbie",
    value: 1,
  },
  {
    label: "Bronze",
    value: 2,
  },
  {
    label: "Silver",
    value: 3,
  },
  {
    label: "Gold",
    value: 4,
  },
  {
    label: "Diamond",
    value: 5,
  },
];

const LevelChallengeOfSolution: FC = () => {
  const levelChallengeOfSolution = useDrawerFilterSolutionFeedback(
    (state) => state.challengeOfSolution,
  );
  const setLevelChallengeOfSolution = useDrawerFilterSolutionFeedback(
    (state) => state.setChallengeOfSolution,
  );
  const handleOnChange: SelectProps["onChange"] = (value) => {
    setLevelChallengeOfSolution(value);
  };
  return (
    <BoxFilter isLoading={false} nameFilter="Cấp độ của thử thách giải pháp">
      <Select
        onChange={handleOnChange}
        mode="multiple"
        options={options}
        placeholder="Chọn cấp độ thử thách trong của giải pháp"
        defaultValue={levelChallengeOfSolution}
      ></Select>
    </BoxFilter>
  );
};

export default LevelChallengeOfSolution;
