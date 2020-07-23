/* eslint-disable global-require */
/* eslint-disable no-undef */
import Taro from '@tarojs/taro';

// 是否开启统计分析
// 建议本地开发默认关闭, 只在线上版开启
const isAnalysis = false;
if (isAnalysis || (__wxConfig?.envVersion || 'release') === 'release') {
  const uma = require('@/uma').default;
  Taro.uma = uma;
}
