import Taro from '@tarojs/taro';


interface IRequest {
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


const defaults: IRequest = {
  url: '',
  data: {},
  header: {},
  method: 'GET',
  loading: true,
  loadingText: '',
};

function request(options: IRequest) {
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
        Taro.hideLoading();

        const { success, error_msg } = res.data;
        if (success) {
          return resolve(res.data);
        } else {
          Taro.showToast({
            title: error_msg || '请求失败, 请重试',
            icon: 'none',
          });
          return reject(res.data);
        }
      })
      .catch((error) => {
        Taro.hideLoading();

        Taro.showToast({
          title: error.errMsg || '请求失败, 请重试',
          icon: 'none',
        });
        return reject(error);
      })
  });
}

const http = {
  get(options: IRequest): Promise<any> {
    const mergetOptions: IRequest = Object.assign(defaults, options);
    return request(mergetOptions);
  },
  post(options: IRequest): Promise<any> {
    const mergetOptions: IRequest = Object.assign(defaults, { method: 'POST'}, options);
    return request(mergetOptions);
  },
  put(options: IRequest): Promise<any> {
    const mergetOptions: IRequest = Object.assign(defaults, { method: 'PUT'}, options);
    return request(mergetOptions);
  },
  delete(options: IRequest): Promise<any> {
    const mergetOptions: IRequest = Object.assign(defaults, { method: 'DELETE'}, options);
    return request(mergetOptions);
  },
  base(options: IRequest): Promise<any> {
    return request(options);
  },
};

export default http;
