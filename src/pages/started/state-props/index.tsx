import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import './index.scss';

class Index extends Component {
  config: Config = {
    navigationBarTitleText: 'State & Props',
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
        <Text>counter</Text>
      </View>
    );
  }
}

export default Index as ComponentType;
