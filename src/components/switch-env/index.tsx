import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import './index.scss';

type Props = {
  [propName: string]: any,
}

type State = {}

interface Index {
  props: Props,
  state: State,
}

@inject('globalStore')
@observer
class Index extends Component<Props, State> {
  static defaultProps: Props = {}

  constructor(props: Props) {
    super(props);

    this.state = {} as State;
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentWillReact() {}

  render(): object {
    const { onSwitchEnv, onCloseSwitchEnv } = this.props;

    return (
      <View className="debug-panel">
        <View className="debug-panel-body">
          <View
            className="debug-item"
            onClick={() => {
              onSwitchEnv();
            }}
          >
            切换环境
          </View>
          <View
            className="debug-item"
            onClick={() => {
              onCloseSwitchEnv();
            }}
          >
            关闭切换环境
          </View>
        </View>
      </View>
    );
  }
}

export default Index as ComponentType<Props>;
