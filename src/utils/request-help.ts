import Taro from '@tarojs/taro';
import { API_BASE_MAP } from '@/config';
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
   * 请求返回的状态码
   *
   * @type {number}
   */
  statusCode: number,

  /**
   * 响应数据实体
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
    // 为接口加上对应服务的前缀, 拼接成完整的路径
    const { server, url } = options as IRequest;
    const API_BASE = server ? API_BASE_MAP[server] : '';
    options.url = `${API_BASE}${url}`;
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
    resolve(res: IResponse, resolve: any, reject: any): Promise<any> {
      Taro.hideLoading();

      const { data, statusCode } = res;
      const { success, error_msg: errorMsg } = data as SuccessData;

      // 请求出错
      if (statusCode !== 200) {
        const ERROR_MESSAGE_MAP = {
          400: '错误请求',
          401: '未授权，请重新登录',
          403: '拒绝访问',
          404: '请求错误，未找到该资源',
          405: '请求方法未允许',
          408: '请求超时',
          500: '服务器端出错',
          501: '网络未实现',
          502: '网络错误',
          503: '服务不可用',
          504: '网络超时',
          505: 'http版本不支持该请求',
        };
        const errMsg = ERROR_MESSAGE_MAP[statusCode] || `连接错误${statusCode}`;
        return this.error(`${statusCode}-${errMsg}`, data, reject);
      }

      if (success) {
        return resolve(data);
      }

      return this.error(errorMsg, data, reject);
    },

    /**
     * 请求失败
     *
     * @param {errorData} error 失败响应结果
     * @param {*} reject 失败处理函数
     */
    reject(error: errorData, reject: any): Promise<any> {
      Taro.hideLoading();
      console.log('reject error', error);

      return this.error(error.errMsg, error, reject);
    },

    /**
     * 错误处理
     *
     * @param {string} msg 提示信息
     * @param {object} error 错误信息
     * @param {*} reject 错误处理函数
     * @returns
     */
    error(msg: string, error: object, reject: any): Promise<any> {
      Taro.showToast({
        title: msg || '请求失败, 请重试',
        icon: 'none',
      });
      return reject(error);
    },
  },
};

export default interceptors;
