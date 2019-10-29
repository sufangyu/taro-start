import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { gotoPage, PATH_CONFIG } from '@/router';

import './index.scss';

type Props = {}

type State = {}

interface Index {
  props: Props,
  state: State,
}


class Index extends Component {
  config: Config = {
    navigationBarTitleText: '欢迎',
  }

  constructor(props: {}) {
    super(props);

    this.state = {};
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentWillReact() {}

  handleBind() {
    const { params } = this.$router;
    gotoPage({
      url: PATH_CONFIG.account.login,
      query: params,
      mode: 'replace',
    });
  }

  render(): object {
    return (
      <View className="container">
        <View>
          <Text>欢迎绑定账号</Text>
        </View>
        <Button onClick={() => this.handleBind()}>立即绑定</Button>
      </View>
    );
  }
}

export default Index as ComponentType;
