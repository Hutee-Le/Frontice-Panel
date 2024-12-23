import { Select, SelectProps } from "antd";
import { BoxFilter } from "../../../../../../../ChallengeManager/Challenges/List/Partials/DrawerFilter/Partials/BoxFilter";
import useDrawerFilterSolutionFeedback from "../../../../../../../../store/DrawerFilterSolutionFeedback/DrawerFilterSolutionFeedbackStore";

const options: SelectProps["options"] = [
  {
    label: "Tất cả",
    value: "all",
  },
  {
    label: "Đã được phản hồi",
    value: "responded",
  },
  {
    label: "Chưa được phản hồi",
    value: "no-feedback",
  },
];

const TypeSolutionFilter = () => {
  const selectValue = useDrawerFilterSolutionFeedback(
    (state) => state.typeSolution,
  );

  const setTypeSolution = useDrawerFilterSolutionFeedback(
    (state) => state.setTypeSolution,
  );

  const handleOnChange: SelectProps["onChange"] = (value) => {
    setTypeSolution(value);
  };

  return (
    <BoxFilter isLoading={false} nameFilter="Loại giải pháp">
      <Select
        options={options}
        defaultValue={selectValue}
        onChange={handleOnChange}
      />
    </BoxFilter>
  );
};

export default TypeSolutionFilter;
