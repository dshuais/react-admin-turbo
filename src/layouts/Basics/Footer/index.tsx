/*
 * @Author: dushuai
 * @Date: 2024-11-06 10:25:43
 * @LastEditors: dushuai
 * @LastEditTime: 2024-11-06 23:19:40
 * @description: 底部插槽
 */
import settings from '@/settings';

export default {
  /** 左侧菜单栏底部插槽 */
  menuFooterRender: () => false,
  // (props: any) => {
  //   if(props?.collapsed) return undefined;
  //   return settings.copyright();
  // },

  /** page 底部插槽 */
  footerRender: settings.copyright
};