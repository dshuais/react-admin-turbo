
/*
 * @Author: dushuai
 * @Date: 2024-04-07 10:25:43
 * @LastEditors: dushuai
 * @LastEditTime: 2024-11-05 23:19:40
 * @description: 项目基础配置 统一处理
 *
 *    仅配置基础信息 更多定制化操作和布局更改可在layout/basics内配置
 */
import { GithubFilled, InfoCircleFilled, QuestionCircleFilled } from '@ant-design/icons';

/**
 * 项目基础配置
 */
const settings: Settings.settings = {
  /** 项目名称 */
  title: 'React-admin-turbo',

  /**
   * logo 最好是外部链接 或者放在assets内
   *
   * 例如：assets/image/logo.png  即logo: 'image/logo.png'
   *
   * default: image/logo.png
   */
  logo: 'image/logo.png',

  /**
   * 是否展示顶部全局通知
   * 可用于推广版本或推广新网站时 也可在layout/Basics/Header内自定义
   */
  isTopNotice: false,
  /** render as false | () => ReactNode */
  topNotice: {
    text: '本网站提供的部分服务在你当前浏览器中无法使用，建议你更换为Chrome 浏览器查看本网站。',
    btn: '查看详情',
    render: false
  },

  /**
   * 左上角推广其他网站链接     ---后台一般不需要
   */
  appList: [
    // {
    //   icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    //   title: 'Ant Design',
    //   desc: '杭州市较知名的 UI 设计语言',
    //   url: 'https://ant.design',
    //   target: '_blank'
    // },
  ],

  /**
   * 右上角头像旁按钮组   ----可用于社交、导流、提示等
   */
  socialActions: [
    {
      key: 'InfoCircleFilled',
      ic: <InfoCircleFilled />,
      title: '关于',
      onClick: () => {
        console.log('关于');
      }
    },
    {
      key: 'QuestionCircleFilled',
      ic: <QuestionCircleFilled />,
      onClick: () => {
        console.log('疑问');
      }
    },
    {
      key: 'GithubFilled',
      ic: <GithubFilled />,
      title: 'github',
      url: 'https://github.com/dshuais/react-admin-turbo'
    }
  ],

  /**
   * 版权信息展示
   */
  copyright: () => (
    <div
      style={{
        textAlign: 'center',
        paddingBottom: 12
      }}
    >
      <div>© 2024 Made with love</div>
      <div>by Du Shuai.</div>
    </div>
  )

};

export default settings;
