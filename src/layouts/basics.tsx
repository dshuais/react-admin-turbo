/*
 * @Author: dushuai
 * @Date: 2024-04-07 10:25:43
 * @LastEditors: dushuai
 * @LastEditTime: 2024-11-05 23:19:40
 * @description: BasicsLayout
 */
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { Dropdown, Input } from 'antd';
import { GithubFilled, InfoCircleFilled, LogoutOutlined, PlusCircleFilled, QuestionCircleFilled, SearchOutlined } from '@ant-design/icons';

import defaultProps from '@/common/_defaultProps';

import logo from '@/assets/image/turbo-logo.png';

export default function BasicsLayout() {

  const [pathname, setPathname] = useState('/');

  return (
    <ProLayout
      title={import.meta.env.VITE_APP_TITLE}
      logo={<img src={logo} alt="logo" />}
      token={{
        header: {
          // heightLayoutHeader: 108
        }
      }}
      headerRender={(_props, defaultDom) => (
        <>
          {/* <Alert
              message={
                <div
                  style={{
                    color: 'white'
                  }}
                >
                本网站提供的部分服务在你当前浏览器中无法使用，建议你更换为
                Chrome 浏览器查看本网站。
                </div>
              }
              icon={
                <InfoCircleFilled
                  style={{
                    color: 'white'
                  }}
                />
              }
              banner
              style={{
                backgroundColor: 'black'
              }}
              action={
                <Button
                  type="text"
                  style={{
                    color: 'white'
                  }}
                >
                查看详情
                </Button>
              }
            /> */}
          {React.cloneElement(defaultDom as any, {
            style: {
              height: '56px',
              lineHeight: '56px'
            }
          })}
        </>
      )}
      footerRender={() => (
        <div
          style={{
            textAlign: 'center',
            paddingBottom: 12
          }}
        >
          <div>© 2021 Made with love</div>
          <div>by Ant Design</div>
        </div>
      )}
      bgLayoutImgList={[
        {
          src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
          left: 85,
          bottom: 100,
          height: '303px'
        },
        {
          src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
          bottom: -68,
          right: -45,
          height: '303px'
        },
        {
          src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
          bottom: 0,
          left: 0,
          width: '331px'
        }
      ]}
      {...defaultProps}
      location={{
        pathname
      }}
      // menu={{
      //   type: 'group'
      // }}
      avatarProps={{
        src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        size: 'small',
        title: '七妮妮',
        render: (_props, dom) => {
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
      actionsRender={(props) => {
        if(props.isMobile) return [];
        return [
          props.layout !== 'side' && document.body.clientWidth > 1400 ? (
            <div
              key="SearchOutlined"
              // aria-hidden
              style={{
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 24
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <Input
                style={{
                  borderRadius: 4,
                  marginInlineEnd: 12,
                  backgroundColor: 'rgba(0,0,0,0.03)'
                }}
                prefix={
                  <SearchOutlined
                    style={{
                      color: 'rgba(0, 0, 0, 0.15)'
                    }}
                  />
                }
                placeholder="输入关键字搜索"
                variant="borderless"
              />
              <PlusCircleFilled
                style={{
                  color: 'var(--ant-primary-color)',
                  fontSize: 24
                }}
              />
            </div>
          ) : undefined,
          <InfoCircleFilled key="InfoCircleFilled" />,
          <QuestionCircleFilled key="QuestionCircleFilled" />,
          <GithubFilled key="GithubFilled" />
        ];
      }}
      // menuFooterRender={(props) => {
      //   if(props?.collapsed) return undefined;
      //   return (
      //     <div
      //       style={{
      //         textAlign: 'center',
      //         paddingBlockStart: 12
      //       }}
      //     >
      //       <div>© 2021 Made with love</div>
      //       <div>by Ant Design</div>
      //     </div>
      //   );
      // }}
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
