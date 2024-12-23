import { useQuery, useQueryClient } from "@tanstack/react-query";
import constantRootQueryKeys from "../../../../constants/queryKey/root";
import rootService from "../../../../service/Root/RootService";
import { useState } from "react";
import { IRootTaskerApprove } from "../../../../types/response/root/tasker";
import { RedoOutlined } from "@ant-design/icons";
import { Flex, Button, Typography, Table, TableProps, Empty } from "antd";
import { columnsRequestApproveTable } from "./RequestApprove.config";
import { toast } from "react-toastify";

const { Title } = Typography;

const RequestApprovePage = () => {
  const [currentPage, setCurrentPage] = useState<string | number>(1);
  const [pageSize, setPageSize] = useState<string | number>(10);
  const [total, setTotal] = useState<string | number>(0);
  const [requestApproveData, setRequestApproveData] = useState<
    IRootTaskerApprove[]
  >([]);

  const queryClient = useQueryClient();

  const { isFetching } = useQuery({
    queryKey: [constantRootQueryKeys.tasker.getAllRequestApprove],
    queryFn: async () => {
      try {
        const response = await rootService.tasker.getAllRequestApprove({
          page: currentPage,
          perPage: pageSize,
        });
        const responseData = response.data;
        setRequestApproveData(responseData.taskers);
        setTotal(responseData.total);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleRefreshData = async () => {
    return await toast.promise(
      queryClient.refetchQueries({
        queryKey: [constantRootQueryKeys.tasker.getAllRequestApprove],
      }),
      {
        pending: "Đang thực hiên làm mới dữ liệu",
        success: "Làm mới dữ liệu thành công",
        error: "Làm mới dữ liệu thất bại",
      },
    );
  };

  const handleChangeTable: TableProps<IRootTaskerApprove>["onChange"] = (
    pagination,
  ) => {
    if (pagination?.current && pagination?.current !== currentPage) {
      setCurrentPage(pagination.current);
    }

    if (
      pagination?.showSizeChanger &&
      pagination?.pageSize &&
      pagination.pageSize !== pageSize
    ) {
      setPageSize(pagination.pageSize);
    }
  };
  return (
    <Flex vertical gap={32}>
      <Flex
        justify="space-between"
        align="center"
        style={{
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div>
          <Title level={3} style={{ margin: "0" }}>
            Danh sách tài khoản tuyển dụng chờ duyệt
          </Title>
        </div>
        <div>
          <Flex justify="flex-end" align="stretch" gap={12}>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              icon={<RedoOutlined />}
              onClick={() => handleRefreshData()}
            >
              Làm mới
            </Button>

            {/* <Button */}
            {/*   color="primary" */}
            {/*   size="large" */}
            {/*   icon={<FilterOutlined />} */}
            {/*   disabled */}
            {/*   // onClick={() => openDrawerFilter()} */}
            {/* > */}
            {/*   Bộ lọc */}
            {/* </Button> */}
          </Flex>
        </div>
      </Flex>
      <Table
        rowKey={(record) => `${record.id}`}
        loading={isFetching}
        dataSource={requestApproveData}
        columns={columnsRequestApproveTable}
        pagination={{
          pageSize: pageSize as number,
          current: currentPage as number,
          total: total as number,
          showSizeChanger: true,
        }}
        onChange={handleChangeTable}
        scroll={{ x: "max-content" }}
        showHeader
        sticky
        virtual
        locale={{
          emptyText: (
            <Empty description="Không tìm thấy tài khoản tuyển dụng nào cần được duyệt..." />
          ),
        }}
      />
    </Flex>
  );
};

export default RequestApprovePage;
