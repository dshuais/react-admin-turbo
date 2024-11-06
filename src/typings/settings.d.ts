declare namespace Settings {

  type settings = {
    title: string;
    logo: string;
    isTopNotice: boolean;
    topNotice: Notice;
    appList: AppList[];
    socialActions: Social[];
    copyright: () => JSX.Element;
  }

  /** 顶部通知 */
  type Notice = {
    text: string;
    btn: string;
    render: false | (() => ReactNode);
  }

  /** 其他站点信息 */
  type AppList = {
    icon: string;
    title: string;
    desc: string;
    url: string;
    target: string;
    children: AppList[];
  }

  /** 社交组 */
  type Social = {
    key: string;
    ic: JSX.Element;
    title?: string;
    url?: string;
    onClick?: () => void;
  }
}