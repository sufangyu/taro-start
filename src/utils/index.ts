import Taro from '@tarojs/taro';

/**
 * 自定义事件触发器
 *
 * @param {string} eventCode 事件编码
 * @param {object} [params={}] 传参
 */
export function trackEventHandler(eventCode: string, params: object = {}) {
  if (Taro.uma) {
    Taro.uma.trackEvent(eventCode, params);
  }
}
