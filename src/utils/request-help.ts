import Taro from '@tarojs/taro';

import { IRequest } from './request';

type SuccessData = {
  // 是否成功
  success: boolean,
  // 信息提示
  error_msg: string,
}

type errorData = {
  // 错误信息
  errMsg: string,
}

interface IResponse {
  /**
   * 响应数据实体
   *
   * @type {object}
   * @memberof IResponse
   */
  data? : SuccessData,
}

const interceptors = {
  /**
   * 请求拦截
   *
   * @param {IRequest} options 网络请求配置
   */
  request(options: IRequest) {
    console.log('request =>>', options);
  },

  // 响应拦截
  response: {
    /**
     * 请求成功
     *
     * @param {IResponse} res 成功响应结果
     * @param {*} resolve 成功处理函数
     * @param {*} reject 失败处理函数
     * @returns
     */
    resolve(res: IResponse, resolve, reject): Promise<any> {
      Taro.hideLoading();

      const { data } = res;

      const { success, error_msg: errorMsg } = data as SuccessData;
      if (success) {
        return resolve(data);
      }

      return this.$_error(errorMsg, data, reject);
    },

    /**
     * 请求失败
     *
     * @param {errorData} error 失败响应结果
     * @param {*} reject 失败处理函数
     */
    reject(error: errorData, reject): Promise<any> {
      Taro.hideLoading();

      return this.$_error(error.errMsg, error, reject);
    },

    /**
     * 错误处理
     *
     * @param {string} msg 提示信息
     * @param {object} error 错误信息
     * @param {*} reject 错误处理函数
     * @returns
     */
    error(msg: string, error: object, reject): Promise<any> {
      Taro.showToast({
        title: msg || '请求失败, 请重试',
        icon: 'none',
      });
      return reject(error);
    },
  },
};

export default interceptors;