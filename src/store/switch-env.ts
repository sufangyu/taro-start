import Taro from '@tarojs/taro';
import { observable } from 'mobx';
import StoreKey from '@/constants/store-key';

const switchEnvStore = observable({
  counter: 0, // 当前的累加器
  limitCounter: 10, // 达到累加的条件
  isShowed: Taro.getStorageSync(StoreKey.SWITCH_API_ENV_SHOW_KEY) || false,

  increment() {
    this.counter += 1;
  },

  /**
   * 显示切换环境 ActionSheet
   *
   */
  setShowSwitchEnv() {
    this.isShowed = true;
    Taro.setStorage({ key: StoreKey.SWITCH_API_ENV_SHOW_KEY, data: true });
  },

  /**
   * 设置环境信息
   *
   * @param {string} env
   */
  setEnv(val: string) {
    // 清空所有的缓存. 避免环境数据不一致
    Taro.clearStorage();
    Taro.setStorage({ key: StoreKey.API_ENV_KEY, data: val });
    Taro.setStorage({ key: StoreKey.SWITCH_API_ENV_SHOW_KEY, data: true });
  },

  /**
   * 重置环境
   *
   */
  resetEnv() {
    this.isShowed = false;
    this.counter = 0;
    Taro.removeStorage({ key: StoreKey.API_ENV_KEY });
    Taro.removeStorage({ key: StoreKey.SWITCH_API_ENV_SHOW_KEY });
  },
});

export default switchEnvStore;
