import { Button, Flex } from "antd";
import { FC } from "react";
import { openNewTab } from "../../../../../../utils/helper";

interface IActionsSolutionDetailsProps {
  liveGithub: string | null;
  github: string | null;
}
const ActionsSolutionDetails: FC<IActionsSolutionDetailsProps> = ({
  liveGithub,
  github,
}) => {
  return (
    <Flex gap={24}>
      <Button
        size="large"
        variant="solid"
        color="primary"
        style={{ width: "100%" }}
        disabled={!Boolean(liveGithub)}
        onClick={() => openNewTab(liveGithub as string)}
      >
        Xem kết quả
      </Button>
      <Button
        size="large"
        variant="outlined"
        color="primary"
        style={{ width: "100%" }}
        disabled={!Boolean(github)}
        onClick={() => openNewTab(github as string)}
      >
        Xem mã nguồn
      </Button>
      <Button
        size="large"
        variant="dashed"
        color="danger"
        style={{ width: "100%" }}
      >
        Xóa giải pháp
      </Button>
    </Flex>
  );
};

export default ActionsSolutionDetails;
