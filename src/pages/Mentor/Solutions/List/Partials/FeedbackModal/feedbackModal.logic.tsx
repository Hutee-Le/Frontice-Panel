import { CollapseProps, DescriptionsProps, Typography } from "antd";
import { ISolutionFeedbackEntity } from "../../../../../../types/entity/solution";
import { convertTimestampToVietnamTime } from "../../../../../../utils/convertTime";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import constantRoutesGlobal from "../../../../../../constants/routes/global";

interface IViewOwnerProps {
  solutionData: ISolutionFeedbackEntity;
}

const { Text } = Typography;

const ViewOwner: FC<IViewOwnerProps> = ({ solutionData }) => {
  const navigate = useNavigate();
  const handleClickOwner = () => {
    return navigate(
      `/${constantRoutesGlobal.profileTaskee}/${solutionData.taskee.username}`,
    );
  };

  return (
    <Text
      underline
      style={{ cursor: "pointer", color: "#003eb3" }}
      onClick={handleClickOwner}
      copyable={{ tooltips: "Sao chép tên" }}
    >
      {solutionData.taskee.firstname} {solutionData.taskee.lastname}
    </Text>
  );
};

const itemsCollapseSolution: (
  data: ISolutionFeedbackEntity["description"],
) => CollapseProps["items"] = (dataDescription) => {
  return dataDescription.map((description) => {
    return {
      label: description.title,
      children: description.answer,
    };
  });
};

const itemDescriptionSolution: (
  solution: ISolutionFeedbackEntity,
) => DescriptionsProps["items"] = (solution) => {
  return [
    {
      key: "title",
      label: "tiêu đều",
      children: solution.title,
    },
    {
      key: "liked",
      label: "Luợt yêu thích",
      children: solution.liked,
    },
    {
      key: "disliked",
      label: "Luợt không yêu thích",
      children: solution.disliked,
    },
    {
      key: "owner",
      label: "Người thực hiện",
      children: <ViewOwner solutionData={solution} />,
    },
    {
      key: "submittedAt",
      label: "Thời gian nộp",
      children: convertTimestampToVietnamTime(solution.submitedAt),
    },
  ];
};

export { itemDescriptionSolution, itemsCollapseSolution };
