/*
 * @Author: dushuai
 * @Date: 2023-03-20 09:33:25
 * @LastEditors: dushuai
 * @LastEditTime: 2024-11-10 23:57:11
 * @description: ts类型文件
 */

interface Window {
  mozRequestAnimationFrame: (cb: unknown) => number,

  webkitRequestAnimationFrame: (cb: unknown) => number,

  msRequestAnimationFrame: (cb: unknown) => number,

  mozCancelAnimationFrame: (cb: unknown) => number
}

/**
 * App内数据类型
 */
declare namespace App {

  /**
   * 路由类型
   */
  type Route = {
    index?: boolean
    id: number
    name?: string
    icon?: string
    path?: string
    component: string
    redirect?: string
    parent?: string
    parentId?: number
    protected?: boolean
    handle?: Handle
    children?: Array<Route>
    /**
     * 菜单类型 'M'：菜单 'C'：目录
     */
    menuType?: 'M' | 'C'
  }

  type Handle = {
    name?: string
    icon?: string
    parentId?: number
    roles?: string[] // 'admin' | 'other'
  }

}
