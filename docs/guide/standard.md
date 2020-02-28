# 推荐规范

## 命名

**目录、文件命名**
全部采用小写方式， 以中划线分隔。
例: `scripts`, `retina-sprites.scss`, `data.js`, `actionsheet.ts`, `actionsheet.tsx`


**css 变量命名规范**
统一使用`kebab-case`(小写短横线)命名规范。

```css
// sass 
.app-home-vue {}
```

**js 变量命名规范**
统一使用`camelCase`（小写驼峰式）命名规范。

```js
let myName = 'zhangsanfeng';
```

## 组件组织

- 基础 UI 组件统一放在 `src/components`
- 页面业务组件放在对应页面下的`components`文件.


## 网络请求

请求函数统一按模块划分放在 `src/api` 目录下, 只暴露请求方法到给页面调用, 不推荐把请求方法直接写在页面内. 

例如:
```js
// src/api/user.js
import http from '@/utils/request';

export function getUser(username = '') {
  const url = `https://api.github.com/users/${username}`;
  return http.get({ url });
}
```

```js
// page/account/profile.js
import { getUser } from '@/api/users';

...
async handleGetUser() {
  const res = await getUser('username');
},
...
```

## 拓展阅读
- [前端代码规范](https://www.yuque.com/gagwkz/rr9b4y)
