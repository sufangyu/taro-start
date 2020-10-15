import Taro from '@tarojs/taro';
import StoreKey from '@/constants/store-key';


export interface EnvConfig {
  /** 名称 */
  name: string;

  /** 环境标识 */
  value: string;

  /** api 配置 */
  apiBase: {
    [key: string]: string;
  };
}

// 各个环境的 API
export const ENV_MAP: EnvConfig[] = [
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

// 是否是生产环境
const isProd = process.env.NODE_ENV === 'production';

// 命令行指定的运行/打包环境
let CMD_API_ENV = process.env.API_ENV || '';

// 判断是否有对于的环境配置
const hasEnvConfig = ENV_MAP.some((evnConfig: EnvConfig) => {
  return evnConfig.value === CMD_API_ENV;
});

if (CMD_API_ENV) {
  if (!isProd && hasEnvConfig) {
    console.log(`正使用命令行配置的 ${CMD_API_ENV} 环境`);
  }

  if (!hasEnvConfig) {
    console.warn(`缺省 ${CMD_API_ENV} 的环境配置, 将使用默认环境`);
    CMD_API_ENV = '';
  }
}

// 开发环境的环境标识
const ENV_KEY_DEFAULT_DEV = CMD_API_ENV || 'dev';

// 生产环境的环境标识
const ENV_KEY_DEFAULT_PROD = CMD_API_ENV || 'prod';

// 默认环境标识
export const ENV_KEY_DEFAULT = isProd ? ENV_KEY_DEFAULT_PROD : ENV_KEY_DEFAULT_DEV;

// 当前环境标识
const { envVersion } = __wxConfig;
const isReadStore = ['develop', 'trial'].includes(envVersion);
export const ENV_KEY = isReadStore ? (Taro.getStorageSync(StoreKey.API_ENV_KEY) || ENV_KEY_DEFAULT) : ENV_KEY_DEFAULT;

// 当前环境配置
export const ENV_CURRENT = ENV_MAP.find(item => item.value === ENV_KEY) as EnvConfig;

// 当前环境 API MAP
export const API_BASE_MAP = ENV_CURRENT.apiBase;
