import { Card, Flex } from "antd";
import { FC, PropsWithChildren } from "react";
import { NameFilter } from "../../drawerFilterChallenge.style";

type IBoxFilterProps = PropsWithChildren & {
  nameFilter: string | React.ReactNode;
  isLoading: boolean;
};

const BoxFilter: FC<IBoxFilterProps> = ({
  children,
  isLoading,
  nameFilter,
}) => {
  return (
    <Card loading={isLoading} bordered>
      <Flex vertical justify="start" align="stretch" gap={12}>
        <NameFilter>{nameFilter}</NameFilter>
        {children}
      </Flex>
    </Card>
  );
};

export default BoxFilter;
