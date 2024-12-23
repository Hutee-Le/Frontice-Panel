import { FC, useState } from "react";
import { IGetAllTaskeeInChallengeParams } from "../../../../../../../types/request/taskee";
import { Button, Flex, Modal } from "antd";
import challengerTitleModal from "./viewChallengers.content";
import ChallengerTable from "../ChallengerTable/ChallengerTable";

interface IViewChallengersProps {
  challengeId: string;
  typeChallengerInChallenge: IGetAllTaskeeInChallengeParams["query"];
  value: string | number;
}

const ViewChallengers: FC<IViewChallengersProps> = ({
  challengeId,
  value,
  typeChallengerInChallenge,
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const titleModal = challengerTitleModal;
  return (
    <>
      <Flex justify="center" align="stretch" gap={12}>
        <Button
          onClick={() => setIsOpenModal(true)}
          variant="outlined"
          color="primary"
        >
          {value}
        </Button>
      </Flex>

      <Modal
        width={900}
        open={isOpenModal}
        title={
          <div>
            Danh sách <span style={{ color: "#4240C6" }}>Taskee</span>{" "}
            {titleModal[typeChallengerInChallenge]}
          </div>
        }
        onCancel={() => setIsOpenModal(false)}
        footer={() => (
          <>
            <Button onClick={() => setIsOpenModal(false)}>Đóng</Button>
          </>
        )}
      >
        <ChallengerTable
          challengeId={challengeId}
          typeChallengerInChallenge={typeChallengerInChallenge}
        />
      </Modal>
    </>
  );
};

export default ViewChallengers;
