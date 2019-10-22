import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import './index.scss';

interface IProps {} 

interface IState {}

interface Index {
  props: IProps;
  state: IState;
}

@inject()
@observer
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '入门'
  }

  state: IState = {}

  componentWillMount() { }

  componentWillReact() {}

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render () {

    return (
      <View className='container'>
        <Button>
          <Text>counter</Text>
        </Button>
      </View>
    )
  }
}

export default Index  as ComponentType
