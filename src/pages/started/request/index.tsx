import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import {
  getFn, postFn, putFn, deleteFn,
} from '@/api/test';

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
    navigationBarTitleText: '网络请求',
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

  async handleGet() {
    const res = await getFn();
    console.log(res);
  }

  handlePost() {
    postFn();
  }

  handlePut() {
    putFn();
  }

  handleDelete() {
    deleteFn();
  }

  render() {
    return (
      <View className="container">
        <View>
          <Button type="primary" onClick={this.handleGet}>GET 请求</Button>
          <Button type="primary" onClick={this.handlePost}>POST 请求</Button>
          <Button type="primary" onClick={this.handlePut}>PUT 请求</Button>
          <Button type="primary" onClick={this.handleDelete}>DELETE 请求</Button>
        </View>
      </View>
    );
  }
}

export default Index as ComponentType;
