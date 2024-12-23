import { Card, Flex, Typography } from "antd";
import { FC } from "react";

interface ICardChallengeInformationTaskeeProps {
  isLoading: boolean;
  title: string;
  value: string | number;
}

const { Text } = Typography;

const CardChallengeInformationTaskee: FC<
  ICardChallengeInformationTaskeeProps
> = ({ isLoading, title, value }) => {
  return (
    <Card
      loading={isLoading}
      style={{ width: "100%", cursor: "pointer" }}
      // onClick={() => scrollToElement("table__taskee__joined")}
    >
      <Flex vertical justify="center" align="center" gap={12}>
        <Text style={{ fontSize: "16px", fontWeight: "bold" }}>{title}</Text>

        <Text style={{ fontSize: "14px" }}>{value}</Text>
      </Flex>
    </Card>
  );
};

export default CardChallengeInformationTaskee;
