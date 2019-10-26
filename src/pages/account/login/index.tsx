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
    navigationBarTitleText: '绑定账号',
  }

  constructor(props) {
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
        <Button>
          <Text>Empty template</Text>
        </Button>
      </View>
    );
  }
}

export default Index as ComponentType;
