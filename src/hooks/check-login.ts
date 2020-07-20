import Taro, { useCallback } from '@tarojs/taro';
import { useSelector } from '@tarojs/redux';
import { IAccountState } from '@/reducers/account/types';
import { gotoLoginPage } from '@/router';


/**
 * 校验登录的操作
 *
 * @param {Function} fn
 * @returns
 */
function useCheckLogin(fn: Function) {
  const { isLogged }: IAccountState = useSelector((state: any) => state.account);

  return useCallback(async (...args) => {
    if (isLogged === 'NO') {
      const { confirm } = await Taro.showModal({
        title: '提示',
        content: '需登录才可以操作, 确定登录 ?',
      });

      if (confirm) {
        gotoLoginPage('push');
      }
      return;
    }
    fn.call(this, ...args);
  }, [fn, isLogged]);
}

export default useCheckLogin;
