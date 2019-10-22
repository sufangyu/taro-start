import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import { getFn, postFn } from '@/api/test';
import './index.scss';

interface IProps {} 

interface IState {}

interface Index {
  props: IProps;
  state: IState;
}

@inject('globalStore')
@observer
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '入门'
  }

  state: IState = {}

  componentWillMount() { }

  componentWillReact () {}

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleGet() {
    getFn();
  }

  handlePost() {
    postFn();
  }

  render () {

    return (
      <View className='container'>
        <View>
          <Button type='primary' onClick={this.handleGet}>GET 请求</Button>
          <Button type='primary' onClick={this.handlePost}>POST 请求</Button>
        </View>
      </View>
    )
  }
}

export default Index  as ComponentType
