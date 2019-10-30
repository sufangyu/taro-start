import Taro from '@tarojs/taro';
import { API_ENV_KEY } from '@/constants/store-key';

interface IEnvConfig {
  /**
   * 名称
   */
  name: string,

  /**
   * 环境标识
   */
  value: string,

  /**
   * api 配置
   */
  apiBase: object,
}

// 各个环境的 API
export const ENV_MAP: IEnvConfig[] = [
  {
    name: '开发',
    value: 'dev',
    apiBase: {
      base: 'https://dev-cnodejs.org/api/v1',
    },
  },
  {
    name: '测试',
    value: 'test',
    apiBase: {
      base: 'https://test-cnodejs.org/api/v1',
    },
  },
  {
    name: '生产',
    value: 'prod',
    apiBase: {
      base: 'https://cnodejs.org/api/v1',
    },
  },
];

// 默认环境标识
export const ENV_KEY_DEFAULT = 'prod';
// 当前环境标识
export const ENV_KEY = Taro.getStorageSync(API_ENV_KEY) || ENV_KEY_DEFAULT;
// 当前环境配置
export const ENV_CURRENT = ENV_MAP.find(item => item.value === ENV_KEY) as IEnvConfig;
// 当前环境 API MAP
export const API_BASE_MAP = ENV_CURRENT.apiBase;
