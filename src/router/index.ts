import Taro from '@tarojs/taro';
import PATH_CONFIG from './path';


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

interface ICurrentPage {
  /**
   * 路由地址
   */
  route: string,

  /**
   * 页面参数
   */
  options: object,
}


// tabbar 的路径
const PATH_TABBAR: Array<string> = [
  '/pages/home/index',
  '/pages/messages/list/index',
  '/pages/mine/index',
];

// 跳转的方式
const MODE_MAP: object = {
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
  const queries: string[] = [];

  Object.keys(query).forEach((key) => {
    const value = query[key];
    queries.push(`${key}=${value}`);
  });

  const separator = hasSearch ? '&' : '?';
  const fullpath = `${url}${separator}${queries.join('&')}`;
  return fullpath;
}


/**
 * 跳转页面
 *
 * @export
 * @param {IPage} opionts 页面信息
 */
export function gotoPage(opionts: IPage = {url: '', query: {}, mode: 'push'}): void {
  const { url, mode, query } = opionts;
  const fullpath = getFullpath(url, query);
  // 是否 tabBar 页面
  const isSwitchTab = PATH_TABBAR.includes(url);

  if (isSwitchTab) {
    Taro.switchTab({
      url: fullpath,
    }).catch((error) => {
      errorDeal(error);
    });
  } else {
    const key = MODE_MAP[mode || 'push'];
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
 * 跳转/重定向 登录页面
 *
 * @export
 * @param {string} [mode='push'] 跳转的方式
 */
export function gotoLoginPage(mode: string = 'push'): void {
  const { route } = getCurrentPage() as ICurrentPage;
  const fullpath = getFullpath(`/${route}`);
  const fromUrl = encodeURIComponent(fullpath);
  const url = `${PATH_CONFIG.account.welcome}?from=${fromUrl}`;

  gotoPage({ url, mode } as IPage);
}
