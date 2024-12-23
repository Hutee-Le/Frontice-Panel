import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { constantChallengeManagerQueryKey } from "../../../../constants/queryKey/challengeManager";
import challengeManagerService from "../../../../service/ChallengeManager/challengeManagerService";
import { Avatar, Card, Divider, Flex, Typography } from "antd";
import ChallengerTable from "../List/Tables/Partials/ChallengerTable/ChallengerTable";
import { scrollToElement } from "../../../../utils/helper";
import { ChallengeOverview } from "../../../../components/Components/ChallengeOverview";
import { IChallengeEntity } from "../../../../types/entity/challenge";
import { TableSolutionOfChallenge } from "./Partials/TableSolutionOfChallenge";

const { Title } = Typography;

const ChallengeDetailsPage: FC = () => {
  const { Text } = Typography;
  const { challengeId } = useParams();
  console.log("challengeId: ", challengeId);
  const { data, isFetching } = useQuery({
    queryKey: [
      constantChallengeManagerQueryKey.challenge.detailsChallenge,
      challengeId,
    ],
    queryFn: async () => {
      const response = await challengeManagerService.challenge.getDetails({
        challengeId: challengeId as string,
      });
      const responseData = response.data;
      return responseData;
    },
  });

  const defautlAvatar =
    "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <Flex vertical justify="start" align="stretch" gap={32}>
      <ChallengeOverview
        isLoading={isFetching}
        challengeData={data as IChallengeEntity}
        openPercentSubmit
      />

      <Flex justify="center" align="center" gap={24}>
        <Card
          loading={isFetching}
          style={{ width: "100%", cursor: "pointer" }}
          onClick={() => scrollToElement("table__taskee__joined")}
        >
          <Flex vertical justify="center" align="center" gap={12}>
            <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
              Số người tham gia
            </Text>

            <Text style={{ fontSize: "20px" }}>{data?.joinTotal}</Text>
          </Flex>
        </Card>
        <Card loading={isFetching} style={{ width: "100%", cursor: "pointer" }}>
          <Flex vertical justify="center" align="center" gap={12}>
            <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
              Người đăng tải
            </Text>

            <Flex justify="center" align="center" gap={12} vertical>
              <Avatar src={data?.owner.image || defautlAvatar} size={"large"} />
              <Flex vertical justify="center" align="center">
                <Text>{data?.owner.fullname}</Text>
                <Text style={{ fontSize: "14px", color: "grey" }}>
                  {data?.owner.email}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Card>
        <Card
          loading={isFetching}
          style={{ width: "100%", cursor: "pointer" }}
          onClick={() => scrollToElement("table__taskee__unsubmitted")}
        >
          <Flex vertical justify="center" align="center" gap={12}>
            <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
              Số người Hoàn thành
            </Text>

            <Text style={{ fontSize: "20px" }}>{data?.submittedTotal}</Text>
          </Flex>
        </Card>
      </Flex>

      <Divider orientation="left" plain>
        <Title level={4} style={{ margin: "0" }}>
          Danh sách{" "}
          <span style={{ fontWeight: "bold" }}>Taskee đã tham gia</span>
        </Title>
      </Divider>

      <ChallengerTable
        idTable="table__taskee__joined"
        challengeId={challengeId as string}
        typeChallengerInChallenge="all"
        emptyText="Không tìm thấy Taskee nào tham gia vào thử thách..."
      />

      <Divider orientation="left" plain>
        <Title level={4} style={{ margin: "0" }}>
          Danh sách{" "}
          <span style={{ color: "#EA5B33" }}>Taskee chưa hoàn thành</span>
        </Title>
      </Divider>

      <ChallengerTable
        challengeId={challengeId as string}
        typeChallengerInChallenge="unsubmitted"
        emptyText="Không tìm thấy  Taskee nào chưa hoàn thành..."
      />

      <Divider orientation="left" plain>
        <Title level={4} style={{ margin: "0" }}>
          Danh sách{" "}
          <span style={{ color: "#1CBD74" }}>Taskee đã hoàn thành</span>
        </Title>
      </Divider>

      <ChallengerTable
        idTable="table__taskee__unsubmitted"
        challengeId={challengeId as string}
        typeChallengerInChallenge="submitted"
        emptyText="Không tìm thấy Taskee nào hoàn thành..."
      />

      <Divider orientation="left" plain>
        <Title level={4} style={{ margin: "0" }}>
          Danh sách{" "}
          <span style={{ color: "#4240C6" }}>Các giải pháp của thử thách</span>
        </Title>
      </Divider>

      {challengeId && <TableSolutionOfChallenge challengeId={challengeId} />}
    </Flex>
  );
};
export default ChallengeDetailsPage;
