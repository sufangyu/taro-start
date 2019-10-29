import Taro from '@tarojs/taro';
import accountStore from '@/store/account';

/**
 * 操作前 检查是否登录
 *
 * 未登录: 提示 & 跳转到登录页面;
 * 已登录: 直接执行操作的逻辑
 *
 * @param {*} target
 * @param {*} name
 * @param {*} descriptor
 * @returns
 */
function checkLogin(target, name, descriptor) {
  const raw = descriptor.value;
  descriptor.value = function cb(...args: any[]) {
    const { account } = accountStore;
    if (!account) {
      Taro.showToast({
        title: '请先登录',
        icon: 'none',
      });

      // @TODO: 跳转登录页
      return;
    }

    raw.apply(this, args);
  };
  return descriptor;
}

export default checkLogin;
