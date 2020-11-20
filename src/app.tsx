import Taro, { Component, Config, Events } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import Index from './pages/home/index';
import appStore from './store';
import './analysis';
import './app.scss';

Taro.events = new Events();


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = appStore();

class App extends Component {
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
      'pages/started/location/index',
      'pages/started/list/index',
      'pages/started/result/index',
      'pages/started/actionsheet/index',
      'pages/started/events/list/index',
      'pages/started/events/detail/index',
      'pages/started/format/index',
      'pages/started/button/index',
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
      custom: false,
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
  }

  componentDidShow() {
    this.checkUpdateVersion();
  }

  componentCatchError() {}

  componentDidCatchError() {}

  /**
   * 检测当前的小程序
   * 是否是最新版本，是否需要下载、更新
   */
  checkUpdateVersion() {
    const canIUse = Taro.canIUse('getUpdateManager');
    if (!canIUse) {
      Taro.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
      });
      return;
    }
    const updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(async () => {
          const { confirm } = await Taro.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
          });
          if (confirm) {
            updateManager.applyUpdate();
          }
        });

        updateManager.onUpdateFailed(() => {
          Taro.showModal({
            title: '已经有新版本',
            content: '请您删除当前小程序，到微信“发现-小程序”页，重新搜索打开',
          });
        });
      }
    });
  }

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
