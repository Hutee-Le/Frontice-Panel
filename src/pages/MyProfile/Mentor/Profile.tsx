import { Navigate } from "react-router-dom";
import useAuthStore from "../../../store/Auth/authStore";
import { MentorProfileSetting } from "./Partials/Setting";
import { itemDescriptionMentorProfile } from "./profile.logic";
import constantRoutesGlobal from "../../../constants/routes/global";
import { Card, Descriptions, Divider, Flex } from "antd";
import { AvatarMentor } from "./Partials/AvatarMentor";
import { TableSolutionResponded } from "./Partials/TableSolutionResponded";
import { StatisticAccount } from "./Partials/StatisticAccount";
import { MentorChangePassword } from "./Partials/ChangePassword";

const MentorProfile = () => {
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
        <Divider orientation="left">Những phản hồi của bạn</Divider>
        <TableSolutionResponded />
      </Flex>
    </Flex>
  );
};

MentorProfile.Setting = MentorProfileSetting;
MentorProfile.ChangePassword = MentorChangePassword;

export default MentorProfile;
