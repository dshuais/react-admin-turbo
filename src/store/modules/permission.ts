import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { createJSONStorage } from 'zustand/middleware';

import { deepClone, padSlashFn } from '@/utils';
import routes, { getPath, modules } from '@/router/routes';
import { ProtectedLoader } from '@/permission';
import { dynamicRoutes, StoreKey } from '@/common';
import { MakeState, createCustomStore } from '../store';

type Store = {
  routes: Array<Route>,
  menus: Array<Route>
}

type Actions = {
  SET_ROUTER: (routes: Array<Route>) => void
  REMOVE_ROUTER: () => void
  GenerateRoutes: () => Promise<RouteObject[]>
}

export type Route = App.Route

/**
 * 当前store版本
 * 更改后需要手动修改并添加migrate逻辑
 */
const APP_STORE_VERSION: number = 0.1;

const initialState = (): Store => ({
  routes: [],
  menus: []
});

export const usePermission = createCustomStore<Store, Actions>(
  StoreKey.PERMISSION,

  initialState(),

  (set, get) => ({

    /**
     * 设置路由
     * @param routes
     */
    SET_ROUTER(routes: Array<Route>) {
      set({ routes });
    },

    REMOVE_ROUTER() {
      set({ routes: [] });
    },

    SET_MENUS(menus: Array<Route>) {
      set({ menus });
    },
    REMOVE_MENUS() {
      set({ menus: [] });
    },

    /**
     * 生成路由表
     */
    GenerateRoutes: () => {
      return new Promise((resolve) => {
        // dynamicRoutes 可替换为接口获取
        get().SET_ROUTER(dynamicRoutes);
        const r = filterToRouter(dynamicRoutes);

        if(r.size === 0) return resolve([]);

        Array.from(r.keys()).map(k => {
          const index = routes.findIndex(item => item.path === k);
          const pre = routes[index].children || [],
            children = r.get(k)?.filter(item => pre.findIndex(i => i.path === item.path) === -1) || [];

          routes[index].children = [...pre, ...children];
        });
        console.log('routes', routes, r.get('/'));

        resolve(routes);
      });
    }

  }),

  {
    name: StoreKey.PERMISSION, // unique name
    storage: createJSONStorage(() => sessionStorage),
    version: APP_STORE_VERSION, // a migration will be triggered if the version in the storage mismatches this one

    // migration logic
    migrate: (persistedState, version) => {
      type State = Store & MakeState

      const state = initialState();

      if(version !== APP_STORE_VERSION) {
        Object.assign(state, persistedState);
      }

      return state as State;
    }
  }
);

/**
 * new 动态加载路由
 * @param {Route[]} routes
 * @returns Map<string, RouteObject[]>()
 */
function filterToRouter(routes: Route[]) {
  const newRoutes = filterAsyncRouter(routes);

  const rs = new Map<string, RouteObject[]>();

  newRoutes.map(route => {
    const { parent, ...r } = route;
    const k = padSlashFn(parent) || '/';
    const v = rs.get(k);
    if(v) rs.set(k, [...v, r]);
    else rs.set(k, [r]);
  });

  return rs;
}

/**
 * 处理动态路由
 * @param routes
 * @returns
 */
function filterAsyncRouter(routes: Route[], parentPath?: string) {
  const newRoutes = deepClone<Route[]>(routes);

  return newRoutes.map(route => {
    const parent = getParentPath(newRoutes, route, parentPath);

    const r: RouteObject & { parent: string } = {
      index: route.index,
      id: route.id as unknown as string,
      path: joinPath(route.path, parent),
      Component: createComponent(route.component),
      // children: route.children && route.children.length ? filterAsyncRouter(route.children) : void 0,
      handle: {
        name: route.name,
        icon: route.icon,
        parentId: route.parentId,
        ...(route.handle || {})
      },
      parent: padSlashFn(route.parent) || '/'
    };

    if(route.protected !== false) {
      r.loader = ProtectedLoader;
    }

    if(route.children && route.children.length) {
      r.children = filterAsyncRouter(route.children, r.path);
    }

    return r;

  });
}

/**
 * 获取动态页面
 * @param name
 * @returns
 */
function createComponent(name: string) {
  console.log('modules:>> ', modules);
  return lazy(modules[getPath(name)]);
}

/**
 * 拼接path
 * @param path
 * @param parent
 * @returns
 */
function joinPath(path?: string, parent?: string) {
  if(!path) return void 0;
  return `${padSlashFn(parent)}${padSlashFn(path)}`;
}

/**
 * 获取树形结构的父级path 或 嵌套路由的父级path （只判断两层，不做过多层级处理）
 * @param list 所有路由
 * @param route 当前路由
 * @param parentPath 父级path
 * @returns 父级path
 */
function getParentPath(list: Route[], route: Route, parentPath?: string) {
  const parent = list.find(item => item.id === route.parentId),
    pParent = (parent?.parentId && list.find(item => item.id === parent.parentId)) || void 0;

  const path = joinPath(parent?.path, pParent?.path);

  return path || parentPath || route.parent;
}
