import { FC } from "react";
import { BoxFilter } from "../BoxFilter";
import { Checkbox } from "antd";
import { IGetFilterInforamtion } from "../../../../../../../../types/response/challenge";
import { CheckboxGroupProps } from "antd/es/checkbox";
import useDrawerChallengesFilterStore from "../../../../../../../../store/DrawerChallengesFilter/DrawerChallengesFilterStore";

interface ITechnicalFilterProps {
  isLoading: boolean;
  technicalData: IGetFilterInforamtion["techniques"];
}

const TechnicalFilter: FC<ITechnicalFilterProps> = ({
  isLoading,
  technicalData,
}) => {
  const technical = useDrawerChallengesFilterStore((state) => state.technical);
  const setTechnical = useDrawerChallengesFilterStore(
    (state) => state.setTechnical,
  );
  const CheckBoxGroup = Checkbox.Group;

  const handleChangeTechnical: CheckboxGroupProps["onChange"] = (value) => {
    setTechnical(value);
  };

  return (
    <BoxFilter isLoading={isLoading} nameFilter="Công nghệ sử dụng">
      <CheckBoxGroup
        style={{ gap: "12px" }}
        onChange={handleChangeTechnical}
        value={technical || []}
      >
        {technicalData.map((technical, index) => (
          <Checkbox
            key={`${index}`}
            value={technical.name}
            style={{ textTransform: "uppercase" }}
          >
            {technical.name}
          </Checkbox>
        ))}
      </CheckBoxGroup>
    </BoxFilter>
  );
};

export default TechnicalFilter;
