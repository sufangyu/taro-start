import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { IAccountStore } from '@/store/account';
import { reLaunchLoginPage } from '@/router';
import { SwitchEnv } from '@/components';
import switchEnvDebugger from '@/decorators/switch-env';

import './index.scss';

type Props = {
  accountStore: IAccountStore;
  switchEnvStore: any;
}

type State = {}

interface Index {
  props: Props;
  state: State;
}

@switchEnvDebugger()
@inject('globalStore', 'accountStore')
@observer
class Index extends Component<Props, State> {
  config: Config = {
    navigationBarTitleText: '我的',
  }

  constructor(props: Props) {
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

  [x: string]: any;

  render(): object {
    const { switchEnvStore } = this.props;

    return (
      <View className="container">
        <View className="test-content">
          <Button onClick={() => this.handleShowSwitchEnvAction()}>
            <Text>触发切换环境</Text>
          </Button>

          <Button
            type="primary"
            onClick={() => this.handleLogout()}
          >
            <Text>退出登录</Text>
          </Button>
        </View>

        {
          // 切换环境的内容
          switchEnvStore.isShowed ? (
            <SwitchEnv
              onSwitchEnv={() => {
                this.goToSwitchEnvPage();
              }}
              onCloseSwitchEnv={() => {
                this.handleCloseSwitchEnv();
              }}
            />
          ) : null
        }
      </View>
    );
  }
}

export default Index as ComponentType;
