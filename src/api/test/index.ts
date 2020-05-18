import http from '@/request';
import { IParamsTopics, ITopic } from '@/models/test';

export { IParamsTopics, ITopic };

/**
 * 获取 主题列表
 *
 * @export
 * @param {*} [params={}]
 * @returns
 */
export function getTopics(params: IParamsTopics) {
  return http.get<ITopic[]>({
    url: 'https://cnodejs.org/api/v1/topics',
    data: params,
  });
}


/**
 * POST 请求
 *
 */
export function postFn() {
  return http.post({
    url: 'https://cnodejs.org/api/v1/topics',
    data: {
      name: '张三疯',
      age: 18,
    },
    loadingText: '正在提交...',
  });
}


/**
 * PUT 请求
 *
 */
export function putFn() {
  return http.put({
    url: 'https://cnodejs.org/api/v1/topics',
    data: {
      name: '张三疯',
      age: 18,
    },
    loadingText: '正在提交...',
  });
}


/**
 * DELETE 请求
 *
 */
export function deleteFn() {
  return http.delete({
    url: 'https://cnodejs.org/api/v1/topics',
    data: {
      name: '张三疯',
      age: 18,
    },
    loadingText: '正在提交...',
  });
}
