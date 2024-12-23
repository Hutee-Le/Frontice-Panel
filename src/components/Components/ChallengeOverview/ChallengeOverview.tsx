import {
  Card,
  Col,
  Flex,
  Row,
  Statistic,
  Tag,
  Typography,
  Image,
  Button,
} from "antd";
import { IChallengeEntity } from "../../../types/entity/challenge";
import { FC } from "react";
import { convertTimestampToVietnamTime } from "../../../utils/convertTime";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router";
import constantRoutesChallengeManager from "../../../constants/routes/challengeManager";

interface IChallengeOverviewProps {
  challengeData: IChallengeEntity | Omit<IChallengeEntity, "owner">;
  isLoading: boolean;
  buttonToChallengeDetails?: boolean;
  openPercentSubmit?: boolean;
}

const { Text } = Typography;

const ChallengeOverview: FC<IChallengeOverviewProps> = ({
  isLoading,
  challengeData,
  buttonToChallengeDetails = false,
  openPercentSubmit = false,
}) => {
  const navigate = useNavigate();
  const timeCreated = convertTimestampToVietnamTime(challengeData?.created_at);
  return (
    <Card loading={isLoading}>
      <Row gutter={24} align={"middle"}>
        <Col span={14}>
          <Flex
            vertical
            justify="start"
            align="stretch"
            gap={24}
            style={{ flex: 2, width: "100%" }}
          >
            <Flex justify="space-between" align="center">
              <Flex vertical justify="start" align="stretch" gap={4}>
                <Text style={{ color: "grey", fontSize: "14px" }}>
                  {timeCreated}
                </Text>
                <Title level={2} style={{ margin: 0 }}>
                  {challengeData?.title}
                </Title>
              </Flex>
              {challengeData?.premium && <Tag color="gold">Premium</Tag>}
            </Flex>
            <Flex>
              {challengeData?.technical.map((item, index) => (
                <Tag key={index} color="geekblue">
                  {item}
                </Tag>
              ))}
            </Flex>
            <Text>{challengeData?.shortDes}</Text>
            <Flex justify="start" align="stretch" gap={12}>
              <Card>
                <Statistic
                  title="Cấp độ"
                  precision={2}
                  valueRender={() => (
                    <div style={{ fontSize: "18px" }}>
                      {challengeData?.level}
                    </div>
                  )}
                />
              </Card>
              <Card>
                <Statistic
                  title="Số điểm nhận được"
                  precision={2}
                  valueRender={() => (
                    <div style={{ fontSize: "18px" }}>
                      {challengeData?.point}
                    </div>
                  )}
                />
              </Card>
              {openPercentSubmit && (
                <Card>
                  <Statistic
                    title="Phần trăm hoàn thành"
                    precision={2}
                    valueRender={() => (
                      <div style={{ fontSize: "18px" }}>
                        {challengeData?.submittedRate.toFixed(2)} %
                      </div>
                    )}
                  />
                </Card>
              )}
            </Flex>
            {buttonToChallengeDetails && (
              <Button
                variant="outlined"
                color="primary"
                size="large"
                style={{ width: "60%" }}
                onClick={() =>
                  navigate(
                    `/${constantRoutesChallengeManager.pages.challenges.root}/${constantRoutesChallengeManager.pages.challenges.details}/${challengeData.id}`,
                  )
                }
              >
                Chi tiết thử thách
              </Button>
            )}
          </Flex>
        </Col>
        <Col span={10}>
          <Image
            src={challengeData?.image}
            height={300}
            width={"100%"}
            style={{ objectFit: "cover", width: "100%" }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default ChallengeOverview;
