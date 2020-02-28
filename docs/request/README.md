# 网络请求


项目里所有的请求都会走 `@/utils/request.ts` 里面的 `request` 函数，它统一做了错误处理，封装了 `get` `post` `put` `delete` `base`等请求函数.

## 使用
```js
import http from '@/utils/request';;

export function getUser(username = '') {
  const url = `https://api.github.com/users/${username}`;
  return http.get({ url });
}
```

因为所有请求返回的是 `promise`，所以你也可以对每一个请求通过 `catch` 错误，从而进行单独的处理。
```js
try {
  const res = await getUser();
} catch (error) {
```

## 可配置参数

`get` `post` `put` `delete` 的请求参数 `options` 为对象, 具体可配置的参数有:

- **isCheckLogin**
  - desc: 是否需要校验登录状态
  - type: boolean
  - default: false
- **server**
  - desc: 接口地址对应的后台服务
  - type: string
  - value: 'base' | 'open' | 'baibu'
  - default: 'base'
- **url**
  - desc: 接口地址
  - type: string
- **method**
  - desc: 请求方法
  - type: string
  - value: 'GET' | 'POST' | 'PUT' | 'DELETE'
  - default: 'GET'
- **data**
  - desc: 请求的参数
  - type: object
  - default: {}
- **header**
  - desc: 请求头
  - type: object
  - default: {}
- **loading**
  - desc: 是否显示 loading
  - type: boolean
  - default: false
- **loadingText**
  - desc: loading 提示语
  - type: string
  - default: '加载中'


## 拓展阅读
- [RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)
