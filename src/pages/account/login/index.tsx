import Taro, { FC, useRef, useRouter } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { useDispatch } from '@tarojs/redux';
import { Account, AccountDispatch } from '@/reducers/account/types';
import { gotoPage, PATH_CONFIG } from '@/router';
import { ButtonCountDown } from '@/components';

import './index.scss';


const Index: FC = () => {
  const router = useRouter();
  const timer = useRef<any | null>(null);
  const dispatch = useDispatch<AccountDispatch>();

  const handleGetVerifyCode = (cb: Function) => {
    console.log('发送请求获取验证码');
    const res = true;
    if (res) {
      cb();
    }
  };

  /**
   * 登录绑定
   *
   * @private
   * @memberof Index
   */
  const handleLogin = async () => {
    await Taro.login();
    if (timer.current) {
      clearTimeout(timer.current);
    }

    const account: Account = {
      id: `${+new Date()}`,
      name: '张三疯',
    };

    dispatch({
      type: 'SET_ACCOUNT',
      payload: {
        account,
        isLogged: 'YES',
      },
    });

    // 登录成功, 重定向来源页面
    Taro.showToast({
      title: '登录成功',
      icon: 'success',
      mask: true,
    });
    timer.current = setTimeout(() => {
      const { from } = router.params;
      const redirectUrl = from ? decodeURIComponent(from) : PATH_CONFIG.home;
      const mode = 'replace';
      gotoPage({ url: redirectUrl, mode });
    }, 1000);
  };

  return (
    <View className="container">
      <ButtonCountDown
        countTime={10}
        onClick={(cb) => handleGetVerifyCode(cb)}
      />
      <Button onClick={() => handleLogin()}>
        <Text>登录</Text>
      </Button>
    </View>
  );
};

Index.config = {
  navigationBarTitleText: '登录',
};
