import http from '@/utils/request';
import { IResponeUser, IAddress } from './interface';

/**
 * GET 请求
 *
 */
export function getFn() {
  return http.get<IResponeUser<IAddress>>({
    url: 'https://cnodejs.org/api/v1/topics',
    data: {
      name: '张三疯',
      age: 18,
    },
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
