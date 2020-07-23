import Taro, { FC } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import Index from './pages/home/index';
import appStore from './store';
import './analysis';
import './app.scss';


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = appStore();

const App: FC = () => {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
};

App.config = {
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
    'pages/started/location/index',
    'pages/started/list/index',
  ],
  subPackages: [
    {
      root: 'sub-pages/',
      pages: [
        'debug/env/index',
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
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示',
    },
  },
};

Taro.render(<App />, document.getElementById('app'));
