import { Flex } from "antd";
import { FC } from "react";
import Title from "antd/es/typography/Title";
import OptionRole from "./Partials/OptionsRole/OptionsRole";
import styled from "@emotion/styled";
import constantRoutesAuth from "../../../constants/routes/authentication";

const WrapperConent = styled.div`
  min-height: 100dvh;
  width: 100%;
  display: flex;
`;

interface IOptionRoles {
  name: string;
  redirectTo: string;
}

const OptionsRolePage: FC = () => {
  const optionsRoles: IOptionRoles[] = [
    {
      name: "Mentor",
      redirectTo: `/${constantRoutesAuth.root}/${constantRoutesAuth.mentor.root}`,
    },
    {
      name: "Challenge Manager",
      redirectTo: `/${constantRoutesAuth.root}/${constantRoutesAuth.challengeManager.root}`,
    },
    {
      name: "Tasker",
      redirectTo: `/${constantRoutesAuth.root}/${constantRoutesAuth.tasker.root}`,
    },
    {
      name: "Root",
      redirectTo: `/${constantRoutesAuth.root}/${constantRoutesAuth.adminRoot.root}`,
    },
  ];
  return (
    <WrapperConent>
      <Flex flex={1} justify="center" align="center" gap={32} vertical>
        <Flex vertical justify="center" align="center" gap={24}>
          <Title level={1} style={{ color: "#5250F7", margin: 0 }}>
            Frontice Pannel
          </Title>
          <Title italic={true} style={{ margin: 0 }} level={4}>
            Lựa chọn vai trò của bạn
          </Title>
        </Flex>

        <Flex justify="center" align="stretch" gap={24}>
          {optionsRoles.map((role, index) => (
            <OptionRole
              key={`${index}`}
              nameRole={role.name}
              redirectTo={role.redirectTo}
            />
          ))}
        </Flex>
      </Flex>
    </WrapperConent>
  );
};

export default OptionsRolePage;
