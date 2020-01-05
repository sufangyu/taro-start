import Taro from '@tarojs/taro';
import { observable } from 'mobx';
import StoreKey from '@/constants/store-key';

export type TLogged = 'YES' | 'NO';
export interface IAccount {
  /**
   * 用户 ID
   */
  id?: string;

  /**
   * 用户名
   */
  name?: string;

  [propName: string]: any;
}

export interface IAccountStore {
  /**
   * 用户信息
   */
  account?: IAccount;

  /**
   * 已经登录标记
   */
  logged?: TLogged;

  /**
   * 设置 用户信息
   */
  setAccount?: Function;

  /**
   * 删除 用户信息
   */
  removeAccount?: Function;
}

const store = observable({
  // 用户信息
  account: Taro.getStorageSync(StoreKey.ACCOUNT_KEY) as IAccount || null,

  logged: Taro.getStorageSync(StoreKey.LOGGED_KEY) as TLogged || 'NO',

  /**
   * 设置 用户信息
   *
   * @param {*} [account={}] 用户信息
   */
  setAccount(account: IAccount = {}) {
    Taro.setStorage({ key: StoreKey.ACCOUNT_KEY, data: account });
    Taro.setStorage({ key: StoreKey.LOGGED_KEY, data: 'YES' });
    this.account = { ...account };
    this.logged = 'YES';
  },

  /**
   * 删除 用户信息
   *
   */
  removeAccount() {
    Taro.removeStorage({ key: StoreKey.ACCOUNT_KEY });
    Taro.removeStorage({ key: StoreKey.LOGGED_KEY });
    this.account = null;
    this.logged = 'NO';
  },
});

export default store;
