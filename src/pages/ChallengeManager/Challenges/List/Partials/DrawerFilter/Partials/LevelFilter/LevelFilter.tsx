import { FC } from "react";
import { BoxFilter } from "../BoxFilter";
import { Select, SelectProps } from "antd";
import { IGetFilterInforamtion } from "../../../../../../../../types/response/challenge";
import useDrawerChallengesFilterStore from "../../../../../../../../store/DrawerChallengesFilter/DrawerChallengesFilterStore";

interface ILevelFilterProps {
  isLoading: boolean;
  levelsData: IGetFilterInforamtion["levels"];
}

const LevelFilter: FC<ILevelFilterProps> = ({ levelsData, isLoading }) => {
  const level = useDrawerChallengesFilterStore((state) => state.level);
  const setLevel = useDrawerChallengesFilterStore((state) => state.setLevel);
  const handleChangeLevels = (value: number[]) => {
    setLevel(value);
  };

  return (
    <BoxFilter isLoading={isLoading} nameFilter="Cấp độ">
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Chọn cấp độ thử thách"
        defaultValue={[]}
        value={level}
        onChange={handleChangeLevels as SelectProps["onChange"]}
      >
        {levelsData.map((level, index) => (
          <Select.Option value={level.id} key={`${index}`}>
            {level.name}
          </Select.Option>
        ))}
      </Select>
    </BoxFilter>
  );
};

export default LevelFilter;
