import { Button, Drawer, Flex } from "antd";
import { FC } from "react";
import useDrawerFilterSolutionFeedback from "../../../../../../store/DrawerFilterSolutionFeedback/DrawerFilterSolutionFeedbackStore";
import { TypeSolutionFilter } from "./Partials/TypeSolutionFilter";
import { LevelChallengeOfSolution } from "./Partials/LevelChallengeOfSolution";
import { useSearchParams } from "react-router-dom";

const DrawerFilterSolutionFeedback: FC = ({}) => {
  const [_, setSearchParams] = useSearchParams();
  const isOpen = useDrawerFilterSolutionFeedback((state) => state.isOpen);
  const setIsOpen = useDrawerFilterSolutionFeedback((state) => state.setIsOpen);
  const typeOfSolutionFilterValue = useDrawerFilterSolutionFeedback(
    (state) => state.typeSolution,
  );
  const levelChallengeOfSolutionFilterValue = useDrawerFilterSolutionFeedback(
    (state) => state.challengeOfSolution,
  );

  const resetFilter = useDrawerFilterSolutionFeedback(
    (state) => state.resetInitialValue,
  );

  const handleFilter = () => {
    // TODO: Optimazation logic filter and save key params sync
    const paramsFilter: {
      type?: string;
      levelChallenge?: string;
    } = {
      type: typeOfSolutionFilterValue,
    };

    if (levelChallengeOfSolutionFilterValue.length > 0) {
      paramsFilter.levelChallenge =
        levelChallengeOfSolutionFilterValue.join("-");
    }
    setSearchParams(paramsFilter);
    setIsOpen(false);
  };

  const handleResetFilter = () => {
    setSearchParams;
    resetFilter();
    setIsOpen(false);
  };

  return (
    <Drawer
      maskClosable
      onClose={() => setIsOpen(false)}
      open={isOpen}
      title="Bộ lọc giải pháp phản hồi"
      footer={
        <Flex gap={12}>
          <Button
            style={{ width: "100%" }}
            size="middle"
            variant="solid"
            color="primary"
            onClick={handleFilter}
          >
            Tìm kiếm
          </Button>
          <Button
            style={{ width: "100%" }}
            onClick={handleResetFilter}
            size="middle"
          >
            Hủy bỏ
          </Button>
        </Flex>
      }
    >
      <Flex vertical gap={24}>
        <TypeSolutionFilter />
        <LevelChallengeOfSolution />
      </Flex>
    </Drawer>
  );
};

export default DrawerFilterSolutionFeedback;
