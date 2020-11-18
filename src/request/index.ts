import Taro from '@tarojs/taro';
import mergeWith from 'lodash-es/mergeWith';
import interceptors from './interceptors';
import { Request, ResponsePromise, Method } from './type';

export { Request, ResponsePromise, Method };


// 请求默认配置
const defaults: Request = {
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
 * @param {Request} options 请求配置参数
 * @returns {Promise<object>}
 */
function request<T>(options: Request): ResponsePromise<T> | boolean {
  const mergeOptions = mergeWith({}, defaults, options);
  const requestRes = interceptors.request(mergeOptions);

  if (!requestRes) {
    return false;
  }

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
   * @param {Request} options
   * @returns {ResponsePromise<T>}
   */
  get<T=any>(options: Request): ResponsePromise<T> {
    return request<T>(options);
  },

  /**
   * POST 请求
   *
   * @template T
   * @param {Request} options
   * @returns {ResponsePromise<T>}
   */
  post<T=any>(options: Request): ResponsePromise<T> {
    return request(Object.assign({}, { method: 'POST' }, options));
  },

  /**
   * PUT 请求
   *
   * @template T
   * @param {Request} options
   * @returns {ResponsePromise<T>}
   */
  put<T=any>(options: Request): ResponsePromise<T> {
    return request(Object.assign({}, { method: 'PUT' }, options));
  },

  /**
   * DELETE 请求
   *
   * @template T
   * @param {Request} options
   * @returns {ResponsePromise<T>}
   */
  delete<T=any>(options: Request): ResponsePromise<T> {
    return request(Object.assign({}, { method: 'DELETE' }, options));
  },

  /**
   * BASE 基础请求
   *
   * @template T
   * @param {Request} options
   * @returns {ResponsePromise<T>}
   */
  base<T=any>(options: Request): ResponsePromise<T> {
    return request(options);
  },
};

export default http;
