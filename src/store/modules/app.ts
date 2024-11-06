/*
 * @Author: dushuai
 * @Date: 2024-04-17 14:49:31
 * @LastEditors: dushuais 1137896420@qq.com
 * @LastEditTime: 2024-08-08 21:31:14
 * @description: app store
 */
import { StoreKey } from '@/common';
import { create } from 'zustand';
import { createJSONStorage, persist, devtools } from 'zustand/middleware';

type Store = {
  token: string
  userInfo: Res.UserInfo
  // ... other state properties
}

type Actions = {
  SET_TOKEN: (token: string) => void
  REMOVE_TOKEN: () => void
  RESET: () => void
  SET_USER_INFO: () => void
  SET_STATE: (data: { key: keyof Store, val: Store[keyof Store] }) => void
  // ... other action creators
}

// define the initial state
const initialState = (): Store => ({
  token: '',
  userInfo: {
    id: 1,
    nickName: '',
    avatar: ''
  }
});

/**
 * 当前store版本
 * 更改后需要手动修改并添加migrate逻辑
 */
const APP_STORE_VERSION: number = 0.1;

export const useAppStore = create<Store & Actions>()(devtools(
  persist(
    (set) => ({
      ...initialState(),

      SET_STATE(data: { key: keyof Store, val: Store[keyof Store] }) {
        set({ [data.key]: data.val });
      },

      SET_TOKEN(token) {
        // set({ token })
        set(_state => ({ token }));
      },

      REMOVE_TOKEN() {
        set({ token: '' });
        // set(state => ({ token: '' }))
      },

      SET_USER_INFO() {
        set({
          userInfo: {
            id: 1,
            nickName: '七妮妮',
            avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg'
          }
        });
      },

      RESET() {
        set(initialState());
      }

    }),
    {
      name: StoreKey.APP, // unique name
      storage: createJSONStorage(() => sessionStorage),
      version: APP_STORE_VERSION, // a migration will be triggered if the version in the storage mismatches this one

      // migration logic
      migrate: (persistedState, version) => {

        const state = initialState();

        if(version !== APP_STORE_VERSION) {
          Object.assign(state, persistedState);
        }

        return state;
      }
    }
  ),
  { name: StoreKey.APP, enabled: true }
));
