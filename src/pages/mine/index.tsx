import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { IAccountStore } from '@/store/account';
import { reLaunchLoginPage } from '@/router';
import { DebugEnv } from '@/components';

import './index.scss';

type Props = {
  accountStore: IAccountStore;
}

type State = {}

interface Index {
  props: Props;
  state: State;
}

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
    return (
      <View className="container">
        <View className="test-content">
          <View className="page-title">我的展示页面</View>
          <DebugEnv />
          <Button
            type="primary"
            onClick={() => this.handleLogout()}
          >
            <Text>退出登录</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default Index as ComponentType;
