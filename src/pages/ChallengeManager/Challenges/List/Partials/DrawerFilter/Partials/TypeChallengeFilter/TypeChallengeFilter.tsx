import { FC } from "react";
import { BoxFilter } from "../BoxFilter";
import { Select, SelectProps } from "antd";
import useDrawerChallengesFilterStore from "../../../../../../../../store/DrawerChallengesFilter/DrawerChallengesFilterStore";

const optionSelectTypeChallenge = [
  {
    label: "Tất cả",
    value: "all",
  },
  {
    label: "Premium",
    value: "premium",
  },
];

const TypeChallengeFilter: FC = () => {
  const premiumFilterValue = useDrawerChallengesFilterStore(
    (state) => state.premium,
  );
  const setPremium = useDrawerChallengesFilterStore(
    (state) => state.setPremium,
  );
  const handleChangleSelect: SelectProps["onChange"] = (value) => {
    if (value !== "all") {
      setPremium(true);
      return;
    }

    setPremium(false);
  };

  return (
    <BoxFilter isLoading={false} nameFilter="Loại thử thách">
      <Select
        onChange={handleChangleSelect}
        style={{ width: "100%" }}
        defaultValue={premiumFilterValue ? "premium" : "all"}
        value={premiumFilterValue ? "premium" : "all"}
        options={optionSelectTypeChallenge}
      />
    </BoxFilter>
  );
};

export default TypeChallengeFilter;
