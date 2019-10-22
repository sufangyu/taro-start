import http from '@/utils/request';

/**
 * GET 请求
 *
 */
export function getFn() {
  http.get({
    url: 'http://www.baidu.com',
    data: {
      name: '张三疯',
      age: 18,
    },
  })
}


/**
 * POST 请求
 *
 */
export function postFn() {
  http.post({
    url: 'http://www.baidu.com',
    data: {
      name: '张三疯',
      age: 18,
    },
    loadingText: '正在提交...',
  })
}