import { Button, Flex, Tabs, TabsProps } from "antd";
import { FC, useEffect, useState } from "react";
import { FilterOutlined, PlusOutlined, RedoOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import constantRoutesChallengeManager from "../../../../constants/routes/challengeManager";
import { useNavigate, useSearchParams } from "react-router-dom";
import challengeListTabs from "./challengeList.tabs";
import { useQueryClient } from "@tanstack/react-query";
import { constantChallengeManagerQueryKey } from "../../../../constants/queryKey/challengeManager";
import { toast } from "react-toastify";
import useDrawerChallengesFilterStore from "../../../../store/DrawerChallengesFilter/DrawerChallengesFilterStore";
import DrawerFilterChallenges from "./Partials/DrawerFilter/DrawerFilterChallenges";
import { ITypeOfChallenges } from "../../../../types/other/challenge";
import useAuthStore from "../../../../store/Auth/authStore";
import { AllChallengesTable } from "./Tables/AllChallenges";

const ChallengeListPage: FC = () => {
  const profile = useAuthStore((state) => state.profile);
  console.log(profile?.role);
  const [searchParams, setSearchParams] = useSearchParams();
  const openDrawerFilter =
    useDrawerChallengesFilterStore.getState().openDrawerFilter;
  const typeOfChallenges = useDrawerChallengesFilterStore(
    (state) => state.typeOfChallenges,
  );
  const changeTypeOfChallenge =
    useDrawerChallengesFilterStore.getState().changeTypeOfChallenge;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoadingRefreshChallengebutton, setIsLoadingRefreshChallengeButton] =
    useState<boolean>(false);

  const handleChangeTabs: TabsProps["onChange"] = (activeKeyTab: string) => {
    setSearchParams({ tab: activeKeyTab });
    changeTypeOfChallenge(activeKeyTab as ITypeOfChallenges);
  };

  useEffect(() => {
    const tab = searchParams.get("tab") || "all_challenges";
    changeTypeOfChallenge(tab as ITypeOfChallenges);
  }, [searchParams, typeOfChallenges]);

  const tabsItems = challengeListTabs;

  const revalidateChallenges = async () => {
    setIsLoadingRefreshChallengeButton(true);
    return toast.promise(
      queryClient
        .refetchQueries({
          predicate: (query) =>
            [
              constantChallengeManagerQueryKey.challenge.otherChallenges,
              constantChallengeManagerQueryKey.challenge.myChallenges,
              constantChallengeManagerQueryKey.challenge.allChallenges,
            ].some((key) => JSON.stringify(query.queryKey).includes(key)),
        })
        .finally(() => setIsLoadingRefreshChallengeButton(false)),
      {
        pending: "Đang thực hiện làm mới dữ liệu thử thách",
        success: "Làm mới dữ liệu thử thách thành công",
        error: "Làm mới dữ liệu thử thách thất bại",
      },
    );
  };

  console.log("render challenge list page");
  return (
    <>
      <section className="challenges__manager">
        <Flex vertical justify="start" align="stretch" gap={32}>
          <Flex
            justify="space-between"
            align="center"
            style={{
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div>
              <Title level={3} style={{ margin: "0" }}>
                Danh sách thử thách
              </Title>
            </div>
            <div>
              <Flex justify="flex-end" align="stretch" gap={12}>
                <Button
                  size="large"
                  variant="outlined"
                  color="primary"
                  icon={<RedoOutlined />}
                  onClick={() => revalidateChallenges()}
                  loading={isLoadingRefreshChallengebutton}
                >
                  Làm mới
                </Button>

                <Button
                  type="primary"
                  color="primary"
                  size="large"
                  icon={<PlusOutlined />}
                  onClick={() =>
                    navigate(
                      constantRoutesChallengeManager.pages.challenges.create,
                    )
                  }
                >
                  Tạo thử thách mới
                </Button>
                <Button
                  color="primary"
                  size="large"
                  icon={<FilterOutlined />}
                  onClick={() => openDrawerFilter()}
                >
                  Bộ lọc
                </Button>
              </Flex>
            </div>
          </Flex>

          {profile?.role === "root" ? (
            <AllChallengesTable />
          ) : (
            <Tabs
              defaultActiveKey={typeOfChallenges}
              activeKey={typeOfChallenges}
              items={tabsItems}
              type="card"
              onChange={handleChangeTabs}
              destroyInactiveTabPane={true}
            />
          )}
        </Flex>

        <DrawerFilterChallenges />
      </section>
    </>
  );
};

export default ChallengeListPage;
