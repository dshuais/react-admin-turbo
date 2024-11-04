/*
 * @Author: dushuai
 * @Date: 2024-04-11 11:10:56
 * @LastEditors: dushuais 1137896420@qq.com
 * @LastEditTime: 2024-08-08 21:29:04
 * @description: 动态路由相关
 */

/**
 * 动态配置路由 ------ 这里是前端自己的动态路由
 * 二开时且后端路由时 可让后端根据这个格式返回路由数据
 *
 * @id 路由id 必填 且唯一
 * @index 是否是首页 index为true时不能配置children
 * @path 路由路径 index为true时可以不填
 * @component 路由组件 值为pages目录下文件夹名称
 *      嵌套路由时，目录结构应为pages\*\router\xx\index.tsx
 *      因为减少性能开销 页面规则只支持两种：pages\xx and pages\*\router\xx
 *
 * @parent 父级路由path 默认为/ 对应路由表router/routes一级目录path
 *      使用其他layout时，请配置parent 且在router/routes中配置对应的一级目录
 *
 * @handle 路由配置项 自定义
 * @protected 当前路由是否需要权限 默认true
 * @children 子路由
 *
 */
export const dynamicRoutes: App.Route[] = [
  {
    id: 'Home',
    index: true,
    component: 'home',
    handle: {
      title: '首页',
      roles: ['admin', 'other']
    }
  }
];
