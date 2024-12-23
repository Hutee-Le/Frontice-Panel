import { Button, Drawer, Flex, Segmented } from "antd";
import useDrawerChallengesFilterStore from "../../../../../../store/DrawerChallengesFilter/DrawerChallengesFilterStore";
import { useSearchParams } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import segmentedOptions from "./drawerFilterChallenges.options";
import { BoxFilter } from "./Partials/BoxFilter";
import useDrawerFilterChallengesLogic from "./drawerFilterChallenges.logic";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TimeCreatedFilter } from "./Partials/TimeCreatedFilter";
import { TechnicalFilter } from "./Partials/TechnicalFilter";
import { LevelFilter } from "./Partials/LevelFilter";
import { ScoreFilter } from "./Partials/ScoreFilter";
import OwnerFilter from "./Partials/OwnerFilter/OwnerFilter";
import { TypeChallengeFilter } from "./Partials/TypeChallengeFilter";

dayjs.extend(customParseFormat);

interface IDrawerFilterChallengesProps {}

const DrawerFilterChallenges: FC<IDrawerFilterChallengesProps> = ({}) => {
  // Implement related
  const { queryFilterInformation } = useDrawerFilterChallengesLogic();
  const [searchParams, setSearchParams] = useSearchParams();
  const typeOfChallenges = useDrawerChallengesFilterStore(
    (state) => state.typeOfChallenges,
  );

  // filter state
  const [tabTypeOfChallenge, setTabTypeOfChallenge] =
    useState<string>(typeOfChallenges);

  // data fetching
  const { data, isFetching } = queryFilterInformation;

  // life cycle handle logic
  useEffect(() => {
    setTabTypeOfChallenge(typeOfChallenges);
  }, [searchParams, typeOfChallenges]);

  // status related
  const isOpen = useDrawerChallengesFilterStore((state) => state.isOpen);
  const closeDrawerFilter =
    useDrawerChallengesFilterStore.getState().closeDrawerFilter;

  // filter actions
  const handleOnChalengeSegmented = (value: string) => {
    setTabTypeOfChallenge(value);
  };

  const getAllFilterValue = useDrawerChallengesFilterStore(
    (state) => state.getAllFilterValue,
  );

  const clearFilter = useDrawerChallengesFilterStore(
    (state) => state.clearFilter,
  );

  const handleSubmitFilter = () => {
    const {
      technical: technicalFilterValue,
      owners: ownersFilterValue,
      point: pointFilterValue,
      level: levelFilterValue,
      timeCreated: timeCreatedFilterValue,
      premium: premiumFilterValue,
    } = getAllFilterValue();
    const restSearchParams: { [key: string]: string } = {};
    if (technicalFilterValue !== null) {
      restSearchParams.technical = technicalFilterValue.join("-");
    }

    if (ownersFilterValue !== null && tabTypeOfChallenge !== "my_challenges") {
      restSearchParams.owners = ownersFilterValue.join("%%");
    }

    if (levelFilterValue !== null) {
      restSearchParams.levels = levelFilterValue.join("-");
    }

    if (pointFilterValue !== null) {
      restSearchParams.points = pointFilterValue.join("-");
    }

    if (timeCreatedFilterValue !== null) {
      restSearchParams.timeCreated = timeCreatedFilterValue.join("-");
    }

    if (premiumFilterValue) {
      restSearchParams.premium = "true";
    }

    setSearchParams({ tab: tabTypeOfChallenge, ...restSearchParams });
    closeDrawerFilter();
  };

  const handleClearFilter = () => {
    setTabTypeOfChallenge(typeOfChallenges);
    clearFilter();
  };

  return (
    <Drawer
      title="Bộ lọc thử thách"
      onClose={() => closeDrawerFilter()}
      open={isOpen}
      footer={
        <Flex justify="flex-start" align="stretch" gap={12}>
          <Button
            style={{ width: "100%" }}
            size="large"
            variant="solid"
            color="primary"
            onClick={handleSubmitFilter}
          >
            Lọc
          </Button>

          <Button
            style={{ width: "40%" }}
            size="large"
            variant="outlined"
            color="danger"
            onClick={handleClearFilter}
          >
            Xóa
          </Button>
        </Flex>
      }
    >
      <Flex gap={12} vertical justify="flex-start" align="stretch">
        <BoxFilter isLoading={false} nameFilter="Phân loại thử thách">
          <Segmented
            size="middle"
            value={tabTypeOfChallenge}
            onChange={handleOnChalengeSegmented}
            options={segmentedOptions}
            block
          />
        </BoxFilter>

        <TypeChallengeFilter />

        <TimeCreatedFilter
          isLoading={isFetching}
          minDate={data?.created_at?.min as number}
          maxDate={data?.created_at?.max as number}
        />

        <TechnicalFilter
          isLoading={isFetching}
          technicalData={data?.techniques || []}
        />

        <LevelFilter isLoading={isFetching} levelsData={data?.levels || []} />

        <ScoreFilter
          isLoading={isFetching}
          minScore={data?.point?.min || 0}
          maxScore={data?.point?.max || 0}
        />

        {tabTypeOfChallenge !== "my_challenges" && (
          <OwnerFilter isLoading={isFetching} ownersData={data?.owners || []} />
        )}
      </Flex>
    </Drawer>
  );
};

export default DrawerFilterChallenges;
