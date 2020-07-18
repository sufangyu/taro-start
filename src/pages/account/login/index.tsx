import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { gotoPage, PATH_CONFIG } from '@/router';
import { IAccountStore, IAccount } from '@/store/account';
import { ButtonCountDown } from '@/components';

import './index.scss';

interface Props {
  /**
   * 用户信息的公共操作
   */
  accountStore: IAccountStore;
}

interface State {
  timer: any;
}

interface Index {
  props: Props;
  state: State;
}

@inject('globalStore', 'accountStore')
@observer
class Index extends Component<Props, State> {
  config: Config = {
    navigationBarTitleText: '登录',
  }

  refCountDown: Taro.RefObject<any>;

  constructor(props?: Props) {
    super(props);

    this.refCountDown = Taro.createRef();

    this.state = {
      timer: null,
    };
  }

  handleGetVerifyCode(cb) {
    console.log('发送请求获取验证码');
    const res = true;
    if (res) {
      cb();
    }
    // this.refCountDown.current.start();
  }

  /**
   * 登录绑定
   *
   * @private
   * @memberof Index
   */
  private async handleLogin() {
    const res = await Taro.login();
    console.log(res);

    console.log('登录成功逻辑 =>>');
    const { timer } = this.state;
    clearTimeout(timer);
    const { accountStore } = this.props;
    const account: IAccount = {
      id: `${+new Date()}`,
      name: '张三疯',
    };
    accountStore.setAccount!(account);

    // 登录成功, 重定向来源页面
    Taro.showToast({
      title: '登录成功',
      icon: 'success',
      mask: true,
    });
    this.state.timer = setTimeout(() => {
      const { from } = this.$router.params;
      const redirectUrl = from ? decodeURIComponent(from) : PATH_CONFIG.home;
      const mode = 'replace';
      gotoPage({ url: redirectUrl, mode });
    }, 1000);
  }

  render(): object {
    return (
      <View className="container">
        <ButtonCountDown
          countTime={10}
          onClick={(cb) => this.handleGetVerifyCode(cb)}
        />

        <Button onClick={() => this.handleLogin()}>
          <Text>登录</Text>
        </Button>
      </View>
    );
  }
}

export default Index as ComponentType;
