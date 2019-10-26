import Taro from '@tarojs/taro';
// import PATH_CONFIG from './path';


// tabbar 的路径
const PATH_TABBAR: Array<string> = [
  '/pages/home/index',
  '/pages/messages/list/index',
  '/pages/mine/index',
];

// 跳转的方式
const MODES: object = {
  push: 'navigateTo',
  replace: 'redirectTo',
};


// 跳转页面的错误处理
const errorDeal = (error = { errMsg: '' }): void => {
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
  url: string,
  /**
   * 查询参数
   */
  query? : object,
  /**
   * 页面跳转方式
   */
  mode? : 'push' | 'replace',
}


/**
 * 跳转页面
 *
 * @export
 * @param {IPage} opionts 页面信息
 */
export function gotoPage(opionts: IPage): void {
  const { url, mode, query } = Object.assign({}, {
    url: '',
    query: {},
    mode: 'push',
  }, opionts);

  // 是否 tabBar 页面
  const isSwitchTab = PATH_TABBAR.includes(url);
  const fullpath = getFullpath(url, query);

  if (isSwitchTab) {
    Taro.switchTab({
      url: fullpath,
    }).catch((error) => {
      errorDeal(error);
    });
  } else {
    const key = MODES[mode];
    Taro[key]({
      url: fullpath,
    }).catch((error) => {
      errorDeal(error);
    });
  }
}


/**
 * 返回之前页面
 *
 * @export
 * @param {number} delta 返回页面的个数
 */
export function navigateBack(delta: number = 1): void {
  Taro.navigateBack({ delta });
}


/**
 * 关闭所有页面，打开到某个页面
 *
 * @export
 * @param {IPage} opionts 页面信息
 */
export function reLaunch(opionts: IPage): void {
  const { url } = Object.assign({}, {
    url: '',
    query: {},
  }, opionts);

  Taro.reLaunch({
    url,
  }).catch((error) => {
    errorDeal(error);
  });
}


/**
 * 获取当前页面对象
 *
 * @export
 * @param {number} [offset=0] 相对当前偏移页面数量
 * @returns {object}
 */
export function getCurrentPage(offset: number = 0): object {
  const pages = Taro.getCurrentPages();
  const pageLeng = pages.length;
  let index = pageLeng - 1 - offset;

  // 超出历史记录的个数, 则默认返回最初的第一页
  if (offset > pageLeng - 1) {
    index = 0;
  }

  return pages[index];
}


/**
 * 获取完整的路径
 *
 * @export
 * @param {string} [url=''] 页面地址
 * @param {object} [query={}] 查询参数
 * @returns
 */
export function getFullpath(url: string = '', query: object = {}) {
  if (JSON.stringify(query) === '{}') {
    return url;
  }

  // 是否已有查询参数
  const hasSearch = url.includes('?');
  const queryArr: string[] = [];

  Object.keys(query).forEach((key) => {
    const value = query[key];
    queryArr.push(`${key}=${value}`);
  });

  const separator = hasSearch ? '&' : '?';
  const fullpath = `${url}${separator}${queryArr.join('&')}`;
  return fullpath;
}
