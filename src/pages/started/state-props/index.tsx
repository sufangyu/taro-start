import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import Child from './components/Child';

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
    navigationBarTitleText: '',
  }

  static defaultProps: Props = {}

  constructor(props: Props) {
    super(props);

    this.state = {
      count: 0,
    } as State;
  }

  /**
   *累加
   *
   * @memberof Index
   */
  handleIncrease() {
    this.setState((prevState) => {
      return {
        count: prevState.count + 1,
      };
    });
  }

  /**
   * 累减
   *
   * @memberof Index
   */
  handleMinus() {
    this.setState((prevState) => {
      return {
        count: prevState.count - 1,
      };
    });
  }

  [x: string]: any;

  render(): object {
    const { count } = this.state;
    return (
      <View className="container">
        <View className="demo">
          <View className="demo-title">state:</View>
          <Button
            size="mini"
            onClick={() => {
              this.handleIncrease();
            }}
          >
            点击累加
          </Button>
          <Text>{count}</Text>
        </View>
          
        {/* 组件 Props 属性 */}
        <View className="demo">
          <View className="demo-title">props</View>
          <Child
            count={count}
            onMinus={() => {
              this.handleMinus();
            }}
          />
        </View>
      </View>
    );
  }
}

export default Index as ComponentType<Props>;
