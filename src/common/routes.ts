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
 * @name 路由名称 在侧边栏展示
 * @icon 路由图标 在侧边栏展示
 * @component 路由组件 值为pages目录下文件夹名称 和 pages目录下第一级文件名称
 *      嵌套路由时，目录结构应为pages\**\routes\xx\index.tsx
 *      因为减少性能开销 页面规则只支持三种：
 *          pages\xx\index.tsx and
 *          pages\xx\x\index.tsx and
 *          pages\**\routes\xx\index.tsx
 *      如果是三级目录 也建议使用嵌套路由pages\**\routes\xx\index.tsx来区分层级
 *
 * @parent 父级路由path 默认为/ 对应路由表router/routes一级目录path
 *      使用其他layout时，请配置parent 且在router/routes中配置对应的一级目录
 *
 * @parentId 父级路由id 处理树形目录结构，没有则为一级目录
 *
 * @handle 路由配置项 自定义 默认会把name icon parentId传递给handle
 * @protected 当前路由是否需要权限 默认true
 * @children 子路由 注意：children下为嵌套路由 必须配合<Outlet />使用 (不推荐使用，menus中不会处理这一层级)
 *
 */
export const dynamicRoutes: App.Route[] = [
  {
    id: 1,
    index: true,
    component: 'home',
    name: '首页',
    icon: '首页'
  },
  {
    id: 10,
    path: 'home2',
    component: 'home2',
    name: '一级路由',
    icon: '一级路由'
  },
  {
    id: 2,
    path: 'home3',
    component: 'home2/home3',
    name: '一级路由-1',
    icon: '一级路由-1',
    parentId: 10,
    children: [
      {
        id: 3,
        path: 'home2_1',
        component: 'home2/routes/home3_1',
        name: '一级路由-1-1',
        icon: '一级路由-1-1'
      }
    ]
  },
  {
    id: 3,
    path: 'home4',
    component: 'home2/home4',
    name: '一级路由-2',
    icon: '一级路由-2',
    parentId: 10
  },
  {
    id: 4,
    path: 'home5',
    component: 'home2/home5',
    name: '一级路由-3',
    icon: '一级路由-3',
    parentId: 3
  }
];
