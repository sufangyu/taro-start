import Taro from '@tarojs/taro';
import { observable } from 'mobx';
import { ACCOUNT_KEY } from '@/constants/store-key';

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
  account: Taro.getStorageSync(ACCOUNT_KEY) as IAccount || null,

  /**
   * 设置 用户信息
   *
   * @param {*} [account={}] 用户信息
   */
  setAccount(account: IAccount = {}) {
    Taro.setStorage({ key: ACCOUNT_KEY, data: account });
    this.account = { ...account };
  },

  /**
   * 删除 用户信息
   *
   */
  removeAccount() {
    Taro.removeStorage({ key: ACCOUNT_KEY });
    this.account = null;
  },
});

export default store;
