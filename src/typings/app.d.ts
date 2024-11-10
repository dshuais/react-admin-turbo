/*
 * @Author: dushuai
 * @Date: 2023-03-20 09:33:25
 * @LastEditors: dushuai
 * @LastEditTime: 2024-11-11 00:37:50
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
    id: number
    name: string
    icon?: string
    path: string
    component?: string
    redirect?: string
    parentId?: number
    protected?: boolean
    handle?: Handle
    children?: Array<Route>
    /**
     * 菜单类型 'M'：菜单 'C'：目录
     */
    menuType?: 'M' | 'C'
    /** 排序 */
    sort: number
    /** 是否隐藏 */
    hidden?: boolean
  }

  type Handle = {
    name?: string
    icon?: string
    parentId?: number
    roles?: string[] // 'admin' | 'other'
    /**
     * 菜单类型 'M'：菜单 'C'：目录
     */
    menuType?: 'M' | 'C'
  }

}
