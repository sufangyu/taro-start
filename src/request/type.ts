// 请求方法
export declare type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface Request {
  /**
   * 接口地址对应的后台服务
   *
   * @type {string}
   */
  server?: 'base' | 'open' | 'baibu';
  /**
   * 接口地址
   *
   * @type {string}
   */
  url: string;
  /**
   * 请求方法
   *
   * @type {Method}
   */
  method?: Method;
  /**
   * 请求的参数
   *
   * @type {{[key: string]: any}}
   * @memberof Request
   */
  data?: {[key: string]: any;};
  /**
   * 请求头
   *
   * @type {{[key: string]: string}}
   */
  header?: {[key: string]: string;};
  /**
   * 是否显示 loading
   *
   * @type {boolean}
   */
  loading?: boolean;
  /**
   * loading 提示语
   *
   * @type {string}
   */
  loadingText?: string;
  /**
   * 是否显示错误 toast 提示信息
   *
   * @type {boolean}
   */
  isShowErrorToast?: boolean;
}


export interface Response<T=any> {
  /**
   * 业务处理是否成功
   *
   * @type {boolean}
   * @memberof Response
   */
  success: boolean;

  /**
   * 业务返回的数据
   *
   * @type {T}
   * @memberof Response
   */
  data: T;
}


export interface IPromise<T=any> extends Promise<Response<T>> {}


export interface SuccessData {
  /**
   * 是否成功
   *
   * @type {boolean}
   */
  success: boolean;
  /**
   * 信息提示
   *
   * @type {string}
   */
  error_msg: string;
}

export interface ErrorData {
  /**
   * 错误信息
   *
   * @type {string}
   */
  errMsg: string;
}

export interface ProxyResponse {
  /**
   * 响应的 HTTP 状态码
   *
   * @type {number}
   */
  statusCode: number;
  /**
   * 响应的描述
   *
   * @type {string}
   */
  errMsg?: string;
  /**
   * 响应的实际数据
   *
   * @type {SuccessData}
   */
  data? : SuccessData;
}
