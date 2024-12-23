import { Avatar, Button, Flex, Typography } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import constantRoutesGlobal from "../../../constants/routes/global";

interface IViewOwnerProps {
  username: string;
  company?: string;
  firstName: string;
  lastName: string;
  image: string;
  navigateTo?: "taskee" | "tasker";
}

const { Text } = Typography;

const ViewOwner: FC<IViewOwnerProps> = ({
  username,
  company,
  image,
  navigateTo,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (navigateTo === "tasker") {
      navigate(`/${constantRoutesGlobal.profileTasker}/${username}`);
    }
  };

  return (
    <Button size="large" onClick={handleClick}>
      <Flex justify="start" align="center" gap={8}>
        <Avatar src={image} size={"small"} />
        <Text>{company}</Text>
      </Flex>
    </Button>
  );
};

export default ViewOwner;
