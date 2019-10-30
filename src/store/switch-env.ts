import Taro from '@tarojs/taro';
import { observable } from 'mobx';
import { API_ENV_KEY, SWITCH_API_ENV_SHOW_KEY } from '@/constants/store-key';

const switchEnvStore = observable({
  counter: 0,
  limitCounter: 10,
  isShowed: Taro.getStorageSync(SWITCH_API_ENV_SHOW_KEY) || false,

  increment() {
    this.counter += 1;
  },

  /**
   * 显示切换环境
   *
   */
  showSwitchEnv() {
    console.log('显示切换环境');
    this.isShowed = true;
    Taro.setStorage({ key: SWITCH_API_ENV_SHOW_KEY, data: true });
  },

  /**
   * 设置环境信息
   *
   * @param {string} env
   */
  setEnv(val: string) {
    // 清空所有的缓存. 避免环境数据不一致
    Taro.clearStorage();
    Taro.setStorage({ key: API_ENV_KEY, data: val });
    Taro.setStorage({ key: SWITCH_API_ENV_SHOW_KEY, data: true });
  },

  /**
   * 重置环境
   *
   */
  resetEnv() {
    this.isShowed = false;
    this.counter = 0;
    Taro.removeStorage({ key: API_ENV_KEY });
    Taro.removeStorage({ key: SWITCH_API_ENV_SHOW_KEY });
  },
});

export default switchEnvStore;
