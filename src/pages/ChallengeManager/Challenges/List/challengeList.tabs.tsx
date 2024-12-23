import { TabsProps } from "antd";
import { AllChallengesTable } from "./Tables/AllChallenges";
import { MyChallengesTable } from "./Tables/MyChallenges";
import OtherChallengesTable from "./Tables/OtherChallenges/OtherChallenges";

const challengeListTabs: TabsProps["items"] = [
  {
    label: "Tất cả",
    key: "all_challenges",
    children: <AllChallengesTable />,
  },
  {
    label: "Của tôi",
    key: "my_challenges",
    children: <MyChallengesTable />,
  },
  {
    label: "Của người khác",
    key: "other_challenges",
    children: <OtherChallengesTable />,
  },
];

export default challengeListTabs;
