import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { gotoPage, PATH_CONFIG } from '@/router';

import './index.scss';

type Props = {}

type State = {
  timer: any,
}

interface Index {
  props: Props,
  state: State,
}

@inject('globalStore')
@observer
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '绑定账号',
  }

  constructor(props) {
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
    clearTimeout(this.state.timer);
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
