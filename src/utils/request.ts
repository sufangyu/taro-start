import Taro from '@tarojs/taro';
import interceptors from './request-help';

export interface IRequest {
  /**
   * 接口地址对应的后台服务
   *
   * @type {string}
   * @memberof IRequest
   */
  server?: 'base' | 'open' | 'baibu',

  /**
   * 接口地址
   *
   * @type {string}
   * @memberof IRequest
   */
  url: string,

  /**
   * 请求方法
   *
   * @type {('GET' | 'POST' | 'PUT' | 'DELETE')}
   * @memberof IRequest
   */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',

  /**
   * 请求的参数
   *
   * @type {object}
   * @memberof IRequest
   */
  data?: object,

  /**
   * 请求头
   *
   * @type {object}
   * @memberof IRequest
   */
  header?: object,

  /**
   * 是否显示 loading
   *
   * @type {boolean}
   * @memberof IRequest
   */
  loading?: boolean,


  /**
   * loading 提示语
   *
   * @type {string}
   * @memberof IRequest
   */
  loadingText?: string,
}

export interface IResponse<T=any> {
  /**
   * 业务处理是否成功
   *
   * @type {boolean}
   * @memberof IResponse
   */
  success: boolean,

  /**
   * 业务返回的数据
   *
   * @type {T}
   * @memberof IResponse
   */
  data: T,
}

export interface IPromise<T=any> extends Promise<IResponse<T>> {}


// 请求默认配置
const defaults: IRequest = {
  server: 'base',
  url: '',
  data: {},
  header: {},
  method: 'GET',
  loading: true,
  loadingText: '',
};


/**
 * 请求函数
 *
 * @param {IRequest} options
 * @returns {Promise<object>}
 */
function request<T>(options: IRequest): IPromise<T> {
  interceptors.request(options);

  const {
    url,
    data,
    header,
    method,
    loading,
    loadingText = '',
  } = options;

  return new Promise((resolve, reject) => {
    // 显示 loading
    if (loading) {
      Taro.showLoading({ title: loadingText, mask: true });
    }

    Taro
      .request({
        url,
        data,
        method,
        header,
      })
      .then((res) => {
        interceptors.response.resolve<T>(res, resolve, reject);
      })
      .catch((error) => {
        interceptors.response.reject(error, reject);
      });
  });
}

const http = {
  /**
   * GET 请求
   *
   * @template T
   * @param {IRequest} options
   * @returns {IPromise<T>}
   */
  get<T=any>(options: IRequest): IPromise<T> {
    const mergetOptions: IRequest = Object.assign(defaults, options);
    return request<T>(mergetOptions);
  },

  /**
   * POST 请求
   *
   * @template T
   * @param {IRequest} options
   * @returns {IPromise<T>}
   */
  post<T=any>(options: IRequest): IPromise<T> {
    const mergetOptions: IRequest = Object.assign(defaults, { method: 'POST' }, options);
    return request(mergetOptions);
  },

  /**
   * PUT 请求
   *
   * @template T
   * @param {IRequest} options
   * @returns {IPromise<T>}
   */
  put<T=any>(options: IRequest): IPromise<T> {
    const mergetOptions: IRequest = Object.assign(defaults, { method: 'PUT' }, options);
    return request(mergetOptions);
  },

  /**
   * DELECT 请求
   *
   * @template T
   * @param {IRequest} options
   * @returns {IPromise<T>}
   */
  delete<T=any>(options: IRequest): IPromise<T> {
    const mergetOptions: IRequest = Object.assign(defaults, { method: 'DELETE' }, options);
    return request(mergetOptions);
  },

  /**
   * BASE 基础请求
   *
   * @template T
   * @param {IRequest} options
   * @returns {IPromise<T>}
   */
  base<T=any>(options: IRequest): IPromise<T> {
    return request(options);
  },
};

export default http;
