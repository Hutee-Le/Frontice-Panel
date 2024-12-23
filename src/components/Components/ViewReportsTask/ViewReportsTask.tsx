import { Avatar, List } from "antd";
import { FC } from "react";
import { IGetTaskDetailsResponse } from "../../../types/response/task";

interface IViewReportsTaskProps {
  reportsData: IGetTaskDetailsResponse["reports"];
}

const ViewReportsTask: FC<IViewReportsTaskProps> = ({ reportsData }) => {
  return (
    <List
      dataSource={reportsData}
      renderItem={(report, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                src={
                  report.reportBy.image ||
                  `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`
                }
              />
            }
            title={`${report.reportBy.firstname} ${report.reportBy.lastname}`}
            description={report.reason}
          />
        </List.Item>
      )}
    />
  );
};

export default ViewReportsTask;
