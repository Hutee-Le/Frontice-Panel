import { Avatar, Badge, Button, Flex } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import constantRoutesGlobal from "../../../constants/routes/global";

interface IViewTaskeeProps {
  taskee: {
    username: string;
    firstname: string;
    lastname: string;
    image: string;
    gold_account: boolean;
    url: string;
  };
}

const defautlAvatar =
  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

const ViewTaskee: FC<IViewTaskeeProps> = ({ taskee }) => {
  const navigate = useNavigate();

  const taskeeUsername = taskee.username;

  return (
    <Button
      variant="outlined"
      size="large"
      onClick={() =>
        navigate(`/${constantRoutesGlobal.profileTaskee}/${taskeeUsername}`)
      }
    >
      <Flex justify="flex-start" align="center" gap={12}>
        {taskee.gold_account ? (
          <Badge dot color="volcano" size="default">
            <Avatar src={taskee.image || defautlAvatar} />
          </Badge>
        ) : (
          <Avatar src={taskee.image || defautlAvatar} />
        )}
        <div className="full_name">
          {taskee.firstname} {taskee.lastname}
        </div>
      </Flex>
    </Button>
  );
};

export default ViewTaskee;
