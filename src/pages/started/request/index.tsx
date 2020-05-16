import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import {
  getTopics, IParamsTopics,
  postFn, putFn, deleteFn,
} from '@/api/test';

import './index.scss';

type Props = {}

type State = {}

interface Index {
  props: Props;
  state: State;
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

  /**
   * 获取主题列表
   *
   */
  async handleGetTopics() {
    const params: IParamsTopics = {
      page: 1,
      limit: 10,
      tab: 'all',
    };
    const { data } = await getTopics(params);
    data.forEach(item => {
      console.log(`ID: ${item.id}, 创建时间: ${item.create_at}`);
    });
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
          <Button type="primary" onClick={this.handleGetTopics}>GET 请求</Button>
          <Button type="primary" onClick={this.handlePost}>POST 请求</Button>
          <Button type="primary" onClick={this.handlePut}>PUT 请求</Button>
          <Button type="primary" onClick={this.handleDelete}>DELETE 请求</Button>
        </View>
      </View>
    );
  }
}

export default Index as ComponentType;
