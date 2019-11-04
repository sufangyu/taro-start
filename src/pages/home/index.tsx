import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import withLogin from '@/decorators/with-login';

import './index.scss';

type Props = {}

interface Index {
  props: Props;
}

@withLogin()
@inject('globalStore')
@observer
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '首页',
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentWillReact() {}

  render() {
    return (
      <View className="container">
        <Text>Home page</Text>
      </View>
    );
  }
}

export default Index as ComponentType;
