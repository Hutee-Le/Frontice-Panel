import { ITaskSolutionEntity } from "../../../../types/entity/solution";
import { Typography } from "antd";
import { convertTimestampToVietnamTime } from "../../../../utils/convertTime";
import { FC } from "react";
import { openNewTab } from "../../../../utils/helper";

const { Text } = Typography;

interface IEmptyTextProps {
  text: string;
}

const EmptyText: FC<IEmptyTextProps> = ({ text }) => {
  return <Text style={{ color: "red" }}>{text}</Text>;
};

const generateTaskSolutionItemsDescription = (data?: ITaskSolutionEntity) => {
  return [
    {
      key: "title",
      label: "Tiêu đề giải pháp",
      children: data?.title,
    },
    {
      key: "github",
      label: "Mã nguồn giải pháp",
      children: data?.github ? (
        <Text
          underline
          style={{ cursor: "pointer" }}
          onClick={() => openNewTab(data?.github)}
        >
          {data.github}
        </Text>
      ) : (
        <EmptyText text="Không tìm thấy" />
      ),
    },
    {
      key: "liveGithub",
      label: "Kết quả giải pháp",
      children: data?.liveGithub ? (
        <Text
          underline
          onClick={() => openNewTab(data?.liveGithub)}
          style={{ cursor: "pointer" }}
        >
          {data?.liveGithub}
        </Text>
      ) : (
        <EmptyText text="Không tìm thấy" />
      ),
    },
    {
      key: "submittedAt",
      label: "Thời gian nộp",
      children: convertTimestampToVietnamTime(data?.submittedAt || 0),
    },
  ];
};

export default generateTaskSolutionItemsDescription;
