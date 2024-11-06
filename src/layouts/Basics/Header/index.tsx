import React from 'react';
import { Alert, Button, Tooltip } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';

import settings from '@/settings';
import Search from './Search';

const { isTopNotice, topNotice: { text, btn, render }, socialActions } = settings;

export default {
  headerRender: (_props: any, defaultDom: React.ReactNode) => (
    <>
      {
        isTopNotice &&
        <>
          {
            render ? render() : <Alert
              message={
                <div
                  style={{
                    color: 'white'
                  }}
                >
                  {text}
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
                  {btn}
                </Button>
              }
            />

          }
        </>
      }
      {React.cloneElement(defaultDom as any, {
        style: {
          height: '56px',
          lineHeight: '56px'
        }
      })}
    </>
  ),

  actionsRender: (props: any) => {
    if(props.isMobile) return [];
    return [
      props.layout !== 'side' && document.body.clientWidth > 1400 ? <Search /> : undefined,
      ...getSocialActions(socialActions)
    ];
  }

};

function getSocialActions(list: Settings.Social[]) {
  return list.map(item => {

    function onClick() {
      if(item.onClick) return item.onClick();

      item.url && window.open(item.url, '_blank');
    }

    return (
      <Tooltip
        title={item.title}
        key={item.key}
      >
        <div className="w-7 h-7 flex items-center justify-center" onClick={onClick}>
          {item.ic}
        </div>
      </Tooltip>
    );
  });
}
