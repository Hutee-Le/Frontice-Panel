import { useQuery, useQueryClient } from "@tanstack/react-query";
import constantRootQueryKeys from "../../../../constants/queryKey/root";
import rootService from "../../../../service/Root/RootService";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IUserEmployeeEntity } from "../../../../types/response/root/user";
import { Button, Empty, Flex, Table, TableProps, Typography } from "antd";
import { columnsEmloyeeTable } from "./employee.config";
import useAuthStore from "../../../../store/Auth/authStore";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";
import constantRoutesRoot from "../../../../constants/routes/root";

const { Title } = Typography;

const EmployeeUserPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const profile = useAuthStore((state) => state.profile);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<string | number>(
    searchParams.get("page") || 1,
  );
  const [pageSize, setPageSize] = useState<string | number>(
    searchParams.get("limit") || 10,
  );
  const [totalUser, setTotalUser] = useState<string | number>(0);
  const [users, setUsers] = useState<IUserEmployeeEntity[]>([]);
  const { isFetching } = useQuery({
    queryKey: [
      constantRootQueryKeys.user.getAllUserByRole,
      "admins",
      currentPage,
      pageSize,
    ],
    queryFn: async () => {
      try {
        const response = await rootService.user.getAllUserEmployee({
          page: currentPage,
          pageSize,
        });

        const responseData = response.data;
        setTotalUser(responseData.total);
        setUsers(
          responseData.admin.filter(
            (user) => user.username !== profile?.username,
          ),
        );
        return responseData;
      } catch (error) {
        console.log("error: ", error);
      }
    },
  });

  const handleChangeTable: TableProps<IUserEmployeeEntity>["onChange"] = (
    paginations,
  ) => {
    if (paginations?.current && paginations.current !== currentPage) {
      const currentPageNow = paginations.current.toString();
      const currentSearchParams = Object.fromEntries(searchParams.entries());
      setCurrentPage(currentPageNow);
      setSearchParams({ ...currentSearchParams, page: currentPageNow });
    }

    if (
      paginations.showSizeChanger &&
      paginations.pageSize &&
      paginations.pageSize !== pageSize
    ) {
      const currentPageSize = paginations.pageSize.toString();
      const currentSearchParams = Object.fromEntries(searchParams.entries());
      setPageSize(currentPageSize);
      setSearchParams({ ...currentSearchParams, limit: currentPageSize });
    }
  };

  const prefetchData = () => {
    queryClient.refetchQueries({
      queryKey: [constantRootQueryKeys.user.getAllUserByRole, "admins"],
    });
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
            Danh sách tài khoản nhân viên
          </Title>
        </div>
        <div>
          <Flex justify="flex-end" align="stretch" gap={12}>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              icon={<RedoOutlined />}
              onClick={prefetchData}
            >
              Làm mới
            </Button>

            <Button
              type="primary"
              color="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() =>
                navigate(constantRoutesRoot.user.createAccountEmployee)
              }
            >
              Tạo tài khoản nhân viên mới
            </Button>
          </Flex>
        </div>
      </Flex>
      <Table<IUserEmployeeEntity>
        rowKey={(record) => `${record.id}`}
        dataSource={users}
        scroll={{ x: "max-content" }}
        loading={isFetching}
        columns={columnsEmloyeeTable}
        pagination={{
          pageSize: pageSize as number,
          current: currentPage as number,
          total: totalUser as number,
          showSizeChanger: true,
        }}
        sticky
        virtual
        showHeader
        onChange={handleChangeTable}
        locale={{
          emptyText: (
            <Empty description={"Không tìm thấy tài khoản nào..."}>
              <Button variant="outlined" color="primary">
                Tạo tài khoản nhân viên ngay
              </Button>
            </Empty>
          ),
        }}
      />
    </Flex>
  );
};

export default EmployeeUserPage;
