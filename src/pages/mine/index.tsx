import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { IAccountStore } from '@/store/account';
import { reLaunchLoginPage } from '@/router';
import SwitchEnv from '@/components/switch-env';
import switchEnvDebugger from '@/decorators/switch-env';

import './index.scss';

type Props = {
  /**
   * 用户信息的公共操作
   */
  accountStore: IAccountStore,
}

type State = {}

interface Index {
  props: Props,
  state: State,
}

@switchEnvDebugger()
@inject('globalStore', 'accountStore')
@observer
class Index extends Component<Props, State> {
  handleShowSwitchEnv: any;

  handleCloseSwitchEnv: any;

  config: Config = {
    navigationBarTitleText: '我的',
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentWillReact() {}

  handleLogout() {
    const { accountStore } = this.props;
    accountStore.removeAccount!();

    // 关闭其他页面, 跳转到欢迎页
    reLaunchLoginPage();
  }

  render(): object {
    return (
      <View className="container">
        <Button>
          <Text>Empty template</Text>
        </Button>

        <Button onClick={() => this.handleLogout()}>
          <Text>退出登录</Text>
        </Button>

        <SwitchEnv
          onSwitchEnv={() => {
            this.handleShowSwitchEnv();
          }}
          onCloseSwitchEnv={() => {
            this.handleCloseSwitchEnv();
          }}
        />
      </View>
    );
  }
}

export default Index as ComponentType;
