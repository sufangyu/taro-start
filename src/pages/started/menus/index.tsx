import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { gotoPage, PATH_CONFIG } from '@/router';

import './index.scss';

type Page = {
  /**
   * 名称
   */
  label?: string,
  /**
   * 路径
   */
  path: string,
}

type Props = {}

type State = {
  /**
   * 导航菜单
   */
  menus: Array<Page>,
}

interface Index {
  props: Props,
  state: State,
}

class Index extends Component {
  config: Config = {
    navigationBarTitleText: '入门',
    disableScroll: true,
  }

  constructor(props) {
    super(props);

    this.state = {
      menus: [
        { label: 'State & Props', path: PATH_CONFIG.started.stateProps },
        { label: '事件处理', path: PATH_CONFIG.started.event },
        { label: '网络请求', path: PATH_CONFIG.started.request },
        { label: '页面跳转', path: PATH_CONFIG.started.navigation },
        { label: '图片上传', path: PATH_CONFIG.started.chooseImage },
      ],
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentWillReact() {}

  handlegotoPage(page: Page): void {
    gotoPage({
      url: page.path,
    });
  }

  render() {
    const { menus } = this.state;

    return (
      <View className="container">
        <View className="page-title">入门教程</View>
        <View className="menu">
          {
            menus.map(item => {
              return (
                <View
                  className="menu-item"
                  key={item.path}
                  onClick={() => this.handlegotoPage(item)}
                >
                  {item.label}
                </View>
              );
            })
          }
        </View>
      </View>
    );
  }
}

export default Index as ComponentType;
