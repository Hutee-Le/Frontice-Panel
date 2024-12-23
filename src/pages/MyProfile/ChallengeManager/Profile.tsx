import { Flex, Card, Descriptions, Divider } from "antd";
import { Navigate } from "react-router";
import constantRoutesGlobal from "../../../constants/routes/global";
import useAuthStore from "../../../store/Auth/authStore";
import { AvatarMentor } from "../Mentor/Partials/AvatarMentor";
import { itemDescriptionMentorProfile } from "../Mentor/profile.logic";
import { ChallengeManagerProfileSetting } from "./Partials/Setting";
import { StatisticAccount } from "./Partials/StatisticAccount";
import { MyChallengesTable } from "../../ChallengeManager/Challenges/List/Tables/MyChallenges";

const ChallengeManagerProfile = () => {
  const profile = useAuthStore((state) => state.profile);

  if (!profile) {
    return <Navigate to={constantRoutesGlobal.errorPage["404"]} replace />;
  }

  const itemsDescription = itemDescriptionMentorProfile(profile);

  return (
    <Flex vertical gap={32}>
      <Flex gap={42} justify="space-between" align="stretch">
        <AvatarMentor currentAvatar={profile?.image} />
        <Card>
          <Descriptions style={{ width: "100%" }} items={itemsDescription} />
        </Card>
      </Flex>
      <StatisticAccount />
      <Flex vertical gap={8}>
        <Divider orientation="left">Những thử thách của bạn</Divider>
        <MyChallengesTable />
      </Flex>
    </Flex>
  );
};

ChallengeManagerProfile.Setting = ChallengeManagerProfileSetting;

export default ChallengeManagerProfile;
