import { Card, Flex, Typography } from "antd";
import { FC } from "react";

const { Text } = Typography;

interface ICardTaskerInformationProps {
  title: string;
  value: string | number;
  isLoading: boolean;
}

const CardTaskerInformation: FC<ICardTaskerInformationProps> = ({
  title,
  value,
  isLoading,
}) => {
  return (
    <Card loading={isLoading} style={{ width: "100%", cursor: "pointer" }}>
      <Flex vertical justify="center" align="center" gap={12}>
        <Text style={{ fontSize: "16px", fontWeight: "bold" }}>{title}</Text>

        <Text style={{ fontSize: "14px" }}>{value}</Text>
      </Flex>
    </Card>
  );
};

export default CardTaskerInformation;
