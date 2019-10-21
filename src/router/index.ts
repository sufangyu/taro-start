import Taro from '@tarojs/taro';
import PATH_CONFIG from './path';


// tabbar 的路径
const PATH_TABBAR: Array<String> = [
  '/pages/home/index',
  '/pages/messages/list/index',
  '/pages/mine/index',
];

// 跳转的方式
const ACTIONS: Object = {
  push: 'navigateTo',
  replace: 'redirectTo',
};


// 跳转页面的错误处理
const errorDeal = (error = {errMsg: ''}) => {
  const { errMsg } = error;
  Taro.showToast({
    title: errMsg,
    icon: 'none',
  });
};

interface IPage {
  /**
   * 页面路径
   */
  url: String,
  /**
   * 查询参数
   */
  query? : Object,
  /**
   * 页面跳转方式
   */
  action? : 'push' | 'replace',
}


export function gotoPage(opionts: IPage) {
  const { url, action } = Object.assign({}, {
    url: '',
    query: {},
    action: 'push',
  },opionts);

  // 是否 tabBar 页面
  const isSwitchTab = PATH_TABBAR.includes(url);

  if (isSwitchTab) {
    Taro.switchTab({
      url,
    }).catch((error) => {
      errorDeal(error);
    });
  } else {
    const key = ACTIONS[action];
    Taro[key]({
      url,
    }).catch((error) => {
      errorDeal(error);
    });
  }

}