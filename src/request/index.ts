import Taro from '@tarojs/taro';
import mergeWith from 'lodash-es/mergeWith';
import interceptors from './interceptors';
import { IRequest, IPromise, Method } from './type';

export { IRequest, IPromise, Method };


// 请求默认配置
const defaults: IRequest = {
  server: 'base',
  url: '',
  data: {},
  header: {},
  method: 'GET',
  loading: true,
  loadingText: '加载中',
  isShowErrorToast: true,
};

/**
 * 请求函数
 *
 * @param {IRequest} options 请求配置参数
 * @returns {Promise<object>}
 */
function request<T>(options: IRequest): IPromise<T> {
  const mergeOptions = mergeWith({}, defaults, options);
  interceptors.request(mergeOptions);

  return new Promise((resolve, reject) => {
    Taro
      .request(mergeOptions)
      .then((res) => {
        interceptors.response.resolve<T>(res, resolve, reject, mergeOptions);
      })
      .catch((error) => {
        interceptors.response.reject(error, reject, mergeOptions);
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
    return request<T>(options);
  },

  /**
   * POST 请求
   *
   * @template T
   * @param {IRequest} options
   * @returns {IPromise<T>}
   */
  post<T=any>(options: IRequest): IPromise<T> {
    return request(Object.assign({}, { method: 'POST' }, options));
  },

  /**
   * PUT 请求
   *
   * @template T
   * @param {IRequest} options
   * @returns {IPromise<T>}
   */
  put<T=any>(options: IRequest): IPromise<T> {
    return request(Object.assign({}, { method: 'PUT' }, options));
  },

  /**
   * DELECT 请求
   *
   * @template T
   * @param {IRequest} options
   * @returns {IPromise<T>}
   */
  delete<T=any>(options: IRequest): IPromise<T> {
    return request(Object.assign({}, { method: 'DELETE' }, options));
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
