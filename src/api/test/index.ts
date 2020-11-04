import http from '@/request';
import { List } from '@/models/test';

/**
 * 获取 列表
 *
 * @export
 * @param {page: number} [params={}]
 * @returns
 */
export function getList(params: {page: number;}) {
  return http.get<{list: List[];}>({
    url: 'http://localhost:3721/api/list',
    data: params,
  });
}


/**
 * POST 请求
 *
 */
export function postFn() {
  return http.post({
    url: 'http://localhost:3721/api/post',
    data: {
      name: '张三疯',
    },
    loadingText: '正在提交',
  });
}


/**
 * PUT 请求
 *
 */
export function putFn() {
  return http.put({
    url: 'http://localhost:3721/api/put',
    data: {
      name: '李四',
    },
    loadingText: '正在提交',
  });
}


/**
 * DELETE 请求
 *
 */
export function deleteFn() {
  return http.delete({
    url: 'http://localhost:3721/api/delete/100',
    loadingText: '正在删除',
  });
}
