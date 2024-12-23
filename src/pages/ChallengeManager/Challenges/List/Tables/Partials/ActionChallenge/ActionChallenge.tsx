import {
  Button,
  Card,
  Checkbox,
  CheckboxProps,
  Flex,
  Modal,
  Statistic,
  Typography,
} from "antd";
import { IChallengeEntity } from "../../../../../../../types/entity/challenge";
import constantRoutesChallengeManager from "../../../../../../../constants/routes/challengeManager";
import { useNavigate } from "react-router-dom";
import { FC, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import challengeManagerService from "../../../../../../../service/ChallengeManager/challengeManagerService";
import { logOnDev } from "../../../../../../../utils/helper";
import { toast } from "react-toastify";
import { constantChallengeManagerQueryKey } from "../../../../../../../constants/queryKey/challengeManager";
import useAuthStore from "../../../../../../../store/Auth/authStore";

interface IActionChallengeProps {
  challenge: IChallengeEntity;
}

const ActionChallenge: FC<IActionChallengeProps> = ({ challenge }) => {
  const profile = useAuthStore((state) => state.profile);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [knowRemoveChallenge, setKnowRemoveChallenge] =
    useState<boolean>(false);
  const [knowPremiumChallenge, setKnowPremiumChallenge] =
    useState<boolean>(false);

  const mutationRemoveChallenge = useMutation({
    mutationKey: ["remove_challenge"],
    mutationFn: async () => {
      return challengeManagerService.challenge.remove({
        challengeId: challenge.id,
      });
    },
    onSuccess: () => {
      queryClient.resetQueries({
        predicate: (query) =>
          [
            constantChallengeManagerQueryKey.challenge.myChallenges,
            constantChallengeManagerQueryKey.challenge.allChallenges,
          ].some((key) => JSON.stringify(query.queryKey).includes(key)),
      });
      logOnDev(`[REMOVE CHALLENGE] success || challenge: ${challenge.id}`);
    },
    onError: () =>
      logOnDev(`[REMOVE CHALLENGE] error || challenge: ${challenge.id}`),
  });

  const handleChangeKnowRemoveChallenge: CheckboxProps["onChange"] = (e) => {
    setKnowRemoveChallenge(e.target.checked);
  };

  const handleChangeKnowChallengePremium: CheckboxProps["onChange"] = (e) => {
    setKnowPremiumChallenge(e.target.checked);
  };

  const handleRemoveChallenge = () => {
    return toast.promise(
      mutationRemoveChallenge.mutateAsync().then(() => setIsOpenModal(false)),
      {
        pending: "Đang thực hiện xóa thử thách",
        success: "Xóa thử thách thành công",
        error: "Xóa thử thách thất bại",
      },
    );
  };

  function checkDisabledButton() {
    if (challenge.premium) {
      if (knowRemoveChallenge && knowPremiumChallenge) {
        return false;
      }

      return true;
    }

    if (knowRemoveChallenge) {
      return false;
    }

    return true;
  }

  const conditionButtonRemove = checkDisabledButton();
  return (
    <>
      <Flex gap={12} justify="start" align="center">
        <Button
          type="primary"
          onClick={() =>
            navigate(
              `/${constantRoutesChallengeManager.pages.challenges.root}/${constantRoutesChallengeManager.pages.challenges.details}/${challenge.id}`,
            )
          }
        >
          Xem chi tiết
        </Button>
        {(challenge.owner.id === profile?.id ||
          profile?.adminRole === "root") && (
          <Button
            variant="outlined"
            color="danger"
            onClick={() => setIsOpenModal(true)}
          >
            Xóa
          </Button>
        )}
      </Flex>

      <Modal
        open={isOpenModal}
        width={620}
        title={"Xác nhận xóa thử thách"}
        okText={"Xác nhận"}
        onOk={handleRemoveChallenge}
        cancelText={"Hủy bỏ"}
        onClose={() => setIsOpenModal(false)}
        onCancel={() => setIsOpenModal(false)}
        footer={() => (
          <>
            <Button
              loading={mutationRemoveChallenge.isPending}
              disabled={conditionButtonRemove}
              onClick={handleRemoveChallenge}
              variant="solid"
              color="danger"
            >
              Xóa
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setIsOpenModal(false)}
              disabled={mutationRemoveChallenge.isPending}
            >
              Hủy
            </Button>
          </>
        )}
      >
        <Flex vertical gap={24} justify="start" align="stretch">
          <Flex justify="space-between" align="stretch" gap={24}>
            <Card bordered style={{ flex: 1 }}>
              <Statistic
                title="Số lượng người tham gia"
                value={challenge.joinTotal}
              />
            </Card>
            <Card bordered style={{ flex: 1 }}>
              <Statistic
                title="Số lượng người hoàn thành"
                value={challenge.submittedTotal}
              />
            </Card>
          </Flex>
          <Flex vertical gap={12} justify="start" align="stretch">
            {challenge.premium && (
              <Typography style={{ fontWeight: "bold" }}>
                Đây là thử thách Premium
              </Typography>
            )}

            <Checkbox
              value={knowRemoveChallenge}
              onChange={handleChangeKnowRemoveChallenge}
            >
              Tôi xác nhận xóa thử thách
            </Checkbox>
            {challenge.premium && (
              <Checkbox
                value={knowPremiumChallenge}
                onChange={handleChangeKnowChallengePremium}
              >
                Tôi biết đó là thử thách premium
              </Checkbox>
            )}
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default ActionChallenge;
