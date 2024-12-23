import { FC } from "react";
import { ChallengeOverview } from "../../../../components/Components/ChallengeOverview";
import { useQuery } from "@tanstack/react-query";
import { constantChallengeManagerQueryKey } from "../../../../constants/queryKey/challengeManager";
import { Navigate, useNavigate, useParams } from "react-router";
import constantRoutesGlobal from "../../../../constants/routes/global";
import challengeManagerService from "../../../../service/ChallengeManager/challengeManagerService";
import {
  Avatar,
  Card,
  Collapse,
  Empty,
  Flex,
  List,
  Tag,
  Typography,
} from "antd";
import { ActionsSolutionDetails } from "./Partials/Actions";
import { convertTimestampToVietnamTime } from "../../../../utils/convertTime";

const { Text, Title } = Typography;

const defautlAvatar =
  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

const SolutionDetailsPage: FC = () => {
  const { solutionId } = useParams();
  const navigate = useNavigate();
  const { data: solutionDetails, isFetching } = useQuery({
    queryKey: [constantChallengeManagerQueryKey.soltuion.details],
    queryFn: async () => {
      if (solutionId) {
        const response = await challengeManagerService.solution.getDetails({
          solutionId: solutionId,
        });
        const responseData = response.data;
        return responseData;
      }
    },
  });

  if (!solutionId) {
    return <Navigate to={constantRoutesGlobal.errorPage[404]} replace />;
  }

  const solutionSubmittedAt = convertTimestampToVietnamTime(
    solutionDetails?.submitedAt as number,
  );
  return (
    <Flex vertical gap={32}>
      {solutionDetails?.challenge && (
        <ChallengeOverview
          challengeData={solutionDetails?.challenge}
          isLoading={isFetching}
          buttonToChallengeDetails
        />
      )}

      <Flex justify="center" align="center" gap={24}>
        <Card loading={isFetching} style={{ width: "100%", cursor: "pointer" }}>
          <Flex vertical justify="center" align="center" gap={12}>
            <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
              Số lượng người thích
            </Text>

            <Text style={{ fontSize: "20px" }}>{solutionDetails?.liked}</Text>
          </Flex>
        </Card>
        <Card
          hoverable
          onClick={() =>
            navigate(
              `/${constantRoutesGlobal.profileTaskee}/${solutionDetails?.taskee.username}`,
            )
          }
          loading={isFetching}
          style={{ width: "100%", cursor: "pointer" }}
        >
          <Flex vertical justify="center" align="center" gap={12}>
            <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
              Người thực hiện
            </Text>

            <Flex justify="center" align="center" gap={12} vertical>
              <Avatar
                src={solutionDetails?.taskee.image || defautlAvatar}
                size={"large"}
              />
              <Flex vertical justify="center" align="center" gap={8}>
                <Text>
                  {solutionDetails?.taskee.firstname}{" "}
                  {solutionDetails?.taskee.lastname}
                </Text>
                <Text style={{ fontSize: "14px", color: "grey" }}>
                  {solutionDetails?.taskee.gold_account && (
                    <Tag color="gold">Premium</Tag>
                  )}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Card>
        <Card
          loading={isFetching}
          style={{ width: "100%", cursor: "pointer" }}
          // onClick={() => scrollToElement("table__taskee__unsubmitted")}
        >
          <Flex vertical justify="center" align="center" gap={12}>
            <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
              Số người không thích
            </Text>

            <Text style={{ fontSize: "20px" }}>
              {solutionDetails?.disliked}
            </Text>
          </Flex>
        </Card>
      </Flex>

      <ActionsSolutionDetails
        liveGithub={solutionDetails?.liveGithub || null}
        github={solutionDetails?.github || null}
      />
      <Card type="inner" title={solutionDetails?.title}>
        <Flex vertical gap={12}>
          <Flex vertical>
            <Title level={5}>Thời gian nộp</Title>
            <Text>{solutionSubmittedAt}</Text>
          </Flex>

          <Flex vertical gap={8}>
            <Title level={5}>Mentor phản hồi</Title>
            {solutionDetails?.mentor_feedback ? (
              <List>
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={
                          solutionDetails.mentor_feedback?.admin_feedback.image
                        }
                      />
                    }
                    title={
                      solutionDetails.mentor_feedback?.admin_feedback.fullname
                    }
                    description={solutionDetails.mentor_feedback?.feedback}
                  />
                </List.Item>
              </List>
            ) : (
              <Empty
                description={
                  <Text>
                    Thử thách chưa có phản hồi của{" "}
                    <Text style={{ color: "blue" }}>Mentor</Text>{" "}
                  </Text>
                }
              />
            )}
          </Flex>

          {solutionDetails && solutionDetails.description && (
            <Flex vertical gap={8}>
              <Title level={5}>Nội dung</Title>
              {solutionDetails?.description?.length > 0 ? (
                solutionDetails.description.map((description, index) => (
                  <Collapse
                    key={index}
                    items={[
                      {
                        label: description.title,
                        key: index,
                        children: <p>{description.answer}</p>,
                      },
                    ]}
                  />
                ))
              ) : (
                <Empty
                  description={
                    "Người dùng không trả lời các câu hỏi mặc định của hệ thống"
                  }
                />
              )}
            </Flex>
          )}
        </Flex>
      </Card>
    </Flex>
  );
};

export default SolutionDetailsPage;
