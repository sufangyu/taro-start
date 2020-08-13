import Taro from '@tarojs/taro';

/**
 * 赋值操作
 * 
 * 为 null, undefined 时会设置默认值
 *
 * @export
 * @param {T} val 值
 * @param {T} defaultVal 默认值
 * @returns
 */
export function setValueWithDefault<T>(val: T, defaultVal: T) {
  return val !== null && val !== undefined ? val : defaultVal;
}


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
