import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { gotoPage, PATH_CONFIG } from '@/router';
import { IAccountStore, IAccount } from '@/store/account';

import './index.scss';

type Props = {
  /**
   * 用户信息的公共操作
   */
  accountStore: IAccountStore,
}

type State = {
  timer: any,
}

interface Index {
  props: Props,
  state: State,
}

@inject('globalStore', 'accountStore')
@observer
class Index extends Component<Props, State> {
  config: Config = {
    navigationBarTitleText: '绑定账号',
  }

  constructor(props?: Props) {
    super(props);

    this.state = {
      timer: null,
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentWillReact() {}

  private handleLogin(): void {
    console.log('登录成功逻辑 =>>');
    const { timer } = this.state;
    clearTimeout(timer);
    const { accountStore } = this.props;
    const account: IAccount = {
      id: `${+new Date()}`,
      name: '张三疯',
    };
    // 函数调用前加 !, 是为了避免可选参数为空时失去断言的作用
    accountStore.setAccount!(account);

    Taro.showToast({
      title: '登录成功',
      icon: 'success',
      mask: true,
    });

    // 重定向来源页面
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
        <Button onClick={() => this.handleLogin()}>
          <Text>登录</Text>
        </Button>
      </View>
    );
  }
}

export default Index as ComponentType;
