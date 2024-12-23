import React, { useState } from 'react';
import { Breadcrumb, Button, Flex, Layout, Menu, MenuProps, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { BrandColorLogo } from '../../assets/images/logos/locals';
import useAuthStore from '../../store/Auth/authStore';
import useDashboardLogic from './dashboard.logic';
import { RoleType } from '../../types/base/role';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { UserCustomer } from './Partials/UserCustomer';

const { Header, Content, Sider } = Layout;

type CustomMenuItem = Required<MenuProps>['items'][number] & {
  path?: string;
  children?: CustomMenuItem[]; // Explicitly define `children` as an array of `CustomMenuItem`.
};

const DashboardLayout: React.FC = () => {
  const role = useAuthStore((state) => state.role);
  const { dashboardMenuContent } = useDashboardLogic(role as RoleType);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const onMenuClick: MenuProps['onClick'] = (e) => {
    const findMenuItem = (
      items: CustomMenuItem[] | undefined
    ): CustomMenuItem | undefined => {
      if (!items) return undefined;

      for (const item of items) {
        if (item.key === e.key) {
          return item;
        }
        if ('children' in item && Array.isArray(item.children)) {
          const childItem = findMenuItem(item.children as CustomMenuItem[]);
          if (childItem) {
            return childItem;
          }
        }
      }

      return undefined;
    };

    const selectedItem = findMenuItem(dashboardMenuContent as CustomMenuItem[]);

    if (selectedItem?.path) {
      navigate(selectedItem.path);
    }
  };

  return (
    <Layout style={{ maxHeight: '100dvh', overflow: 'hidden' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <div
            className="demo-logo-vertical"
            style={{
              width: '154px',
              height: 'auto',
            }}
          >
            <img
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              src={BrandColorLogo}
            />
          </div>
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={dashboardMenuContent}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: 'white' }}>
          <Flex justify="space-between" align="center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />

            <UserCustomer />
          </Flex>
        </Header>
        <Content
          style={{ margin: '0 16px', height: '100dvh', overflow: 'auto' }}
        >
          <Flex vertical>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: 'white',
                borderRadius: borderRadiusLG,
                flex: '1',
              }}
            >
              <Outlet />
            </div>
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
