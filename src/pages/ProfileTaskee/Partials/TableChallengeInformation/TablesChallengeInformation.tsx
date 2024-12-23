import { Button, Divider, Flex, Table, Typography } from "antd";
import { ISolutionEntity } from "../../../../types/entity/solution";
import { FC } from "react";
import { columnsSolutionList } from "./tableChallengeInformation.config";
import { TableProps } from "rc-table";
import { openNewTab } from "../../../../utils/helper";

const { Title } = Typography;
interface ITableChallengeInformationProps {
  solutionData: ISolutionEntity[];
  isLoading: boolean;
}

const TablesChallengeInformation: FC<ITableChallengeInformationProps> = ({
  solutionData,
  isLoading,
}) => {
  const actionsColumns: TableProps<ISolutionEntity>["columns"] = [
    {
      fixed: "right",
      width: 270,
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Flex justify="start" align="stretch" gap={12}>
          <Button
            onClick={() => openNewTab(record.liveGithub)}
            disabled={!Boolean(record.liveGithub)}
          >
            Xem kết quả
          </Button>
          <Button
            onClick={() => openNewTab(record.github)}
            disabled={!Boolean(record.github)}
          >
            Xem mã nguồn
          </Button>
        </Flex>
      ),
    },
  ];
  return (
    <>
      <Divider orientation="left" plain>
        <Title level={4} style={{ margin: "0" }}>
          Danh sách các giải pháp
        </Title>
      </Divider>

      <Table
        scroll={{ x: "max-content" }}
        virtual
        showHeader
        sticky
        columns={[...(columnsSolutionList || []), ...actionsColumns]}
        dataSource={solutionData}
        loading={isLoading}
      />
    </>
  );
};

export default TablesChallengeInformation;
