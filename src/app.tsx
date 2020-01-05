import Taro, { Component, Config } from '@tarojs/taro';
import '@tarojs/async-await';
import { Provider } from '@tarojs/mobx';
import Index from './pages/home/index';
import store from './store';

import './app.scss';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }


class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/home/index',

      'pages/mine/index',

      'pages/account/login/index',

      'pages/started/menus/index',
      'pages/started/state-props/index',
      'pages/started/request/index',
      'pages/started/navigation/index',
      'pages/started/pull-down-refresh/index',
      'pages/started/choose-image/index',
      'pages/started/preview-image/index',
      'pages/started/form-validate/index',
    ],
    subPackages: [
      {
        root: 'sub-pages/',
        pages: [
          'pages/demo/index',
        ],
      },
    ],
    window: {
      backgroundColor: '#f5f5f5',
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#5677fc',
      navigationBarTitleText: 'Taro',
      navigationBarTextStyle: 'white',
    },
    tabBar: {
      color: '#808080',
      selectedColor: '#5171f0',
      borderStyle: 'black',
      backgroundColor: '#ffffff',
      list: [
        {
          text: '首页',
          pagePath: 'pages/home/index',
          iconPath: 'assets/images/tabbar/home.png',
          selectedIconPath: 'assets/images/tabbar/home-selected.png',
        },
        {
          text: '入门',
          pagePath: 'pages/started/menus/index',
          iconPath: 'assets/images/tabbar/started.png',
          selectedIconPath: 'assets/images/tabbar/started-selected.png',
        },
        {
          text: '我的',
          pagePath: 'pages/mine/index',
          iconPath: 'assets/images/tabbar/mine.png',
          selectedIconPath: 'assets/images/tabbar/mine-selected.png',
        },
      ],
    },
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
