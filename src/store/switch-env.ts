import Taro from '@tarojs/taro';
import { observable } from 'mobx';
import StoreKey from '@/constants/store-key';

const switchEnvStore = observable({
  /**
   * 设置环境信息
   *
   * @param {string} env
   */
  setEnv(val: string) {
    // 清空所有的缓存. 避免环境数据不一致
    Taro.clearStorage();
    Taro.setStorage({ key: StoreKey.API_ENV_KEY, data: val });
  },

  /**
   * 重置环境
   *
   */
  resetEnv() {
    Taro.removeStorage({ key: StoreKey.API_ENV_KEY });
  },
});

export default switchEnvStore;
