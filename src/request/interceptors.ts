import Taro from '@tarojs/taro';
import { API_BASE_MAP } from '@/config';
import {
  IRequest, IPromise, SuccessData, ErrorData, IProxyResponse,
} from './type';


// 请求、响应拦截器
const interceptors = {
  /**
   * 请求拦截
   *
   * @param {IRequest} options 网络请求配置
   */
  request(options: IRequest) {
    const {
      server, url, loading, loadingText = '',
    } = options;

    // 处理 url
    // http, https 的 API 地址, 无需补全服务的前缀; 为接口加上服务前缀, 拼接成完整的路径
    const hasProtocol = /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
    if (hasProtocol) {
      options.url = url;
    } else {
      const API_BASE = server ? API_BASE_MAP[server] : '';
      options.url = `${API_BASE}${url}`;
    }

    // 显示 loading
    if (loading) {
      Taro.showLoading({ title: loadingText, mask: true });
    }
  },

  // 响应拦截
  response: {
    /**
     * 请求成功
     *
     * @template T
     * @param {IProxyResponse} res 成功响应结果
     * @param {*} resolve 成功处理函数
     * @param {*} reject 失败处理函数
     * @param {*} options 参数
     * @returns {IPromise<T>}
     */
    resolve<T=any>(res: IProxyResponse, resolve: any, reject: any, options: IRequest): IPromise<T> {
      if (options.loading) {
        Taro.hideLoading();
      }

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
        return this.error(`${statusCode}-${errMsg}`, data, reject, options);
      }

      // 请求 & 业务处理成功
      if (success) {
        return resolve(data);
      }

      // 请求成功, 业务处理失败
      return this.error(errorMsg, data, reject, options);
    },

    /**
     * 请求失败
     *
     * @param {ErrorData} error 失败响应结果
     * @param {*} reject 失败处理函数
     * @param {*} options 参数
     */
    reject(error: ErrorData, reject: any, options: IRequest): Promise<any> {
      Taro.hideLoading();
      return this.error(error.errMsg, error, reject, options);
    },

    /**
     * 错误处理
     *
     * @param {string} msg 提示信息
     * @param {object} error 错误信息
     * @param {*} reject 错误处理函数
     * @param {*} options 参数
     * @returns
     */
    error(msg: string, error: object, reject: any, options: IRequest): Promise<any> {
      if (options.isShowErrorToast) {
        Taro.showToast({
          title: msg || '请求失败, 请重试',
          icon: 'none',
          mask: true,
        });
      }
      return reject(error);
    },
  },
};

export default interceptors;
