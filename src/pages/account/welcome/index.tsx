import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import './index.scss';

type Props = {}

type State = {}

interface Index {
  props: Props,
  state: State,
}

@inject('globalStore')
@observer
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

  render(): object {
    return (
      <View className="container">
        <View>
          <Text>欢迎绑定账号</Text>
        </View>
        <Button>立即绑定</Button>
      </View>
    );
  }
}

export default Index as ComponentType;
