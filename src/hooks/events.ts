import Taro, { useEffect } from '@tarojs/taro';

/**
 * 监听事件总线的事件
 *
 * @param {string | symbol} eventName
 * @param {Function} cb
 */
function useEvents<T>(eventName: string | symbol, listener: (...args: T[]) => void) {
  useEffect(() => {
    Taro.events.on(eventName, (...args: T[]) => {
      listener(...args);
    });

    return () => {
      Taro.events.off(eventName);
    };
  });
}

export default useEvents;
