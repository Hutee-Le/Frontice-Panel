import { FC, useState } from "react";
import { BoxFilter } from "../BoxFilter";
import { Checkbox, CheckboxProps, Flex, Slider } from "antd";
import useDrawerChallengesFilterStore from "../../../../../../../../store/DrawerChallengesFilter/DrawerChallengesFilterStore";
import { SliderRangeProps } from "antd/es/slider";

interface IScoreFilterProps {
  isLoading: boolean;
  minScore: number;
  maxScore: number;
}

const ScoreFilter: FC<IScoreFilterProps> = ({
  isLoading,
  minScore,
  maxScore,
}) => {
  const [isDisabledScore, setIsDisabledScore] = useState<boolean>(false);
  const point = useDrawerChallengesFilterStore((state) => state.point);

  const setPoint = useDrawerChallengesFilterStore((state) => state.setPoint);
  const handleChangeDisabledScore: CheckboxProps["onChange"] = (e) => {
    const statusChecked = e.target.checked;
    setIsDisabledScore(statusChecked);
    setPoint(null);
  };

  const handleChangePoint: SliderRangeProps["onChange"] = (value) => {
    setPoint(value);
  };

  return (
    <BoxFilter
      nameFilter={
        <Flex justify="space-between" align="center">
          <div>Số điểm</div>
          <Checkbox onChange={handleChangeDisabledScore}>Không lọc</Checkbox>
        </Flex>
      }
      isLoading={isLoading}
    >
      <Flex
        gap={12}
        justify="flex-start"
        align="center"
        style={{ width: "100%" }}
      >
        <div>{minScore}</div>
        <Slider
          onChange={handleChangePoint}
          disabled={isDisabledScore}
          style={{ width: "100%" }}
          range
          min={minScore}
          max={maxScore}
          value={point || [minScore, minScore]}
        />

        <div>{maxScore}</div>
      </Flex>
    </BoxFilter>
  );
};

export default ScoreFilter;
