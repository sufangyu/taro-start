import Taro from '@tarojs/taro';
import StoreKey from '@/constants/store-key';
import {
  SET_ENV, RESET_ENV,
  DebugState, EnvActionTypes,
} from './types';

const INITIAL_STATE: DebugState = {
  envCode: Taro.getStorageSync(StoreKey.API_ENV_KEY) || '',
};


/**
 * 初始状态
 *
 * @export
 * @param {DebugState} [state=INITIAL_STATE]
 * @param {EnvActionTypes} action
 * @returns
 */
export default function debugReducer(
  state: DebugState = INITIAL_STATE,
  action: EnvActionTypes,
) {
  switch (action.type) {
    case SET_ENV: {
      const { envCode } = action.payload;
      // 清空所有的缓存. 避免环境数据不一致
      Taro.clearStorage();
      Taro.setStorage({ key: StoreKey.API_ENV_KEY, data: envCode });

      return { ...state, envCode };
    }

    case RESET_ENV: {
      Taro.removeStorage({ key: StoreKey.API_ENV_KEY });
      return { ...state, envCode: '' };
    }

    default:
      return state;
  }
}
