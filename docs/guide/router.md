# 新增页面

1、通过命令 `npm run create:page` 创建
```bash
npm run create:page test
# 嵌套页面
npm run create:page nest/test
```

2、在 `src/router/path.ts` 文件配置页面访问的路径.
```js
export default {
  test: {
    list: '/pages/test/index',
  },
  nest: {
    test: '/pages/nest/test/index',
  },
}
```

## 页面命名规范

页面使用 kebab-case(小写短横线)。 path字母全部小写如果有单词拼接，使用中划线 '-'
