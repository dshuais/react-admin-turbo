/*
 * @Author: dushuai
 * @Date: 2024-04-18 15:09:58
 * @LastEditors: dushuais 1137896420@qq.com
 * @LastEditTime: 2024-08-08 21:31:35
 * @description: settings store
 */
import { StoreKey } from '@/common';
import { MakeState, createCustomStore } from '../store';
import { createJSONStorage } from 'zustand/middleware';

type Store = {
  theme: 'dark' | 'light',
  loading: boolean
}

const initialState = (): Store => ({
  theme: 'light',
  loading: false
});

/**
 * 当前store版本
 * 更改后需要手动修改并添加migrate逻辑
 */
const APP_STORE_VERSION: number = 0.1;

export const useSettings = createCustomStore(
  StoreKey.SETTINGS,

  initialState(),

  (set) => ({

    SET_THEME(theme: Store['theme']) {
      set({ theme });
    },

    /**
     * 控制主内容区是否加载中
     * @param loading
     */
    SET_LOADING(loading: Store['loading']) {
      set({ loading });
    }

  }),

  {
    name: StoreKey.SETTINGS, // unique name
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
