import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { getTopics } from '@/api/test';

import './index.scss';

type Props = {}

type State = {
  page: number;
  limit: number;
  status: 'NORMAL' | 'LOADING' | 'NO_MORE';
  list: object[];
  isFixed: boolean;
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
      page: 1,
      limit: 10,
      status: 'NORMAL',
      list: [],
      isFixed: false,
    } as State;
  }

  componentWillMount() {
    this.getTopics();
  }

  componentDidMount() {}

  onPullDownRefresh() {
    Taro.showNavigationBarLoading();
    const page = 1;
    const isRefresh = true;
    this.getTopics(page, isRefresh);
  }

  onReachBottom() {
    const { page } = this.state;
    this.getTopics(page);
  }

  onPageScroll(e) {
    console.log(e.scrollTop);
  }

  async getTopics(page = 1, isRefresh = false) {
    const { limit, list, status } = this.state;
    if (status === 'LOADING') {
      return;
    }

    this.setState({
      status: 'LOADING',
    });

    const data = {
      page,
      limit,
    };
    const res = await getTopics(data);
    console.log(res);
    let currentList: object[] = [];
    if (isRefresh) {
      currentList = [...res.data];
    } else {
      currentList = list.concat(res.data);
    }
    const currentPage = page + 1;
    const currentStatus = 'NORMAL';

    Taro.stopPullDownRefresh();
    Taro.hideNavigationBarLoading();
    this.setState({
      list: currentList,
      page: currentPage,
      status: currentStatus,
    });
  }

  render(): object {
    const { list } = this.state;

    return (
      <View className="container">
        <View className="header">
          固定内容
        </View>

        <View className="content">
          {
            list.map((item: any, idx) => {
              const key = `key-${idx}`;
              return (
                <View
                  className="list"
                  key={key}
                >
                  <Text>{item.title}</Text>
                </View>
              );
            })
          }
        </View>

      </View>
    );
  }
}

export default Index as ComponentType<Props>;
