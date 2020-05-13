import Taro from '@tarojs/taro';
import interceptors from './request-help';
import { IRequest, IPromise, Methohs } from './request-type';

export { IRequest, IPromise, Methohs };


/**
 * 请求函数
 *
 * @param {IRequest} options
 * @returns {Promise<object>}
 */
function request<T>(options: IRequest): IPromise<T> {
  interceptors.request(options);

  return new Promise((resolve, reject) => {
    Taro
      .request(options)
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
