/*
 * @Author: dushuai
 * @Date: 2023-03-20 09:33:25
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-11 11:12:45
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
  }

  type Handle = {
    title?: string
    icon?: string
    roles?: string[] // 'admin' | 'other'
  }

}
