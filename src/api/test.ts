import http from '@/utils/request';

/**
 * GET 请求
 *
 */
export function getFn() {
  return http.get({
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
    url: 'http://www.baidu.com',
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
    url: 'http://www.baidu.com',
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
    url: 'http://www.baidu.com',
    data: {
      name: '张三疯',
      age: 18,
    },
    loadingText: '正在提交...',
  });
}
