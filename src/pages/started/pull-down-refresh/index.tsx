import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import './index.scss';

type Props = {}

type State = {
  count: number;
}

interface Index {
  props: Props;
  state: State;
}

class Index extends Component<Props, State> {
  config: Config = {
    navigationBarTitleText: '下拉刷新',
    enablePullDownRefresh: true,
  }

  static defaultProps: Props = {}

  constructor(props: Props) {
    super(props);

    this.state = {
      count: 0,
    } as State;
  }

  onPullDownRefresh() {
    Taro.showNavigationBarLoading();
    
    setTimeout(() => {
      this.setState((prevState) => {
        return {
          count: prevState.count + 1,
        };
      });
      Taro.stopPullDownRefresh();
      Taro.hideNavigationBarLoading();
    }, 3000);
  }
  
  render(): object {
    const { count } = this.state;
    return (
      <View className="container">
        <Text>刷新次数: {count}</Text>
      </View>
    );
  }
}

export default Index as ComponentType<Props>;
