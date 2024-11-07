/*
 * @Author: dushuai
 * @Date: 2024-04-07 10:25:43
 * @LastEditors: dushuai
 * @LastEditTime: 2024-11-05 23:19:40
 * @description: BasicsLayout
 */
import { ReactNode, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Dropdown } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';

import { Common, Header, Footer, Background, Content } from './Basics/index';
import { useAppStore, usePermission, useSelector, useSettings } from '@/store';

export default function BasicsLayout() {

  const [pathname, setPathname] = useState('/');

  const { loading } = useSettings(useSelector(['loading']));
  const { userInfo } = useAppStore(useSelector(['userInfo']));
  const { menus } = usePermission(useSelector(['menus']));

  useEffect(() => {
    console.log('routes:>> ', menus);
  }, [menus]);

  return (
    <ProLayout
      {...Common}
      {...Header}
      {...Footer}
      {...Background}
      {...Content}
      // {...defaultProps}
      loading={loading}
      location={{
        pathname
      }}
      route={{
        path: '/',
        routes: menus
      }}
      avatarProps={{
        src: userInfo.avatar,
        size: 'small',
        title: userInfo.nickName,
        render: (_props: any, dom: ReactNode) => {
          return (
            <Dropdown
              trigger={['hover']}
              menu={{
                items: [
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: '退出登录'
                  }
                ]
              }}
            >
              {dom}
            </Dropdown>
          );
        }
      }}
      menuItemRender={(item, dom) => (
        <div
          onClick={() => {
            setPathname(item.path || '/');
          }}
        >
          {dom}
        </div>
      )}
      layout="mix"
      // splitMenus
    >
      <PageContainer>
        <ProCard className="container-card">
          <Outlet />
        </ProCard>
      </PageContainer>
    </ProLayout>
  );
}
