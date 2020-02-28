# 构建与发布

## 切换环境

在根目录下 `config/index.ts` 配置打包的环境
```js
export const ENV_KEY_DEFAULT = isProd ? 'prod' : 'qa1';
```


## 构建

当项目开发完毕，只需要运行一行命令就可以打包应用：

```bash
# 打包微信小程序
npm run build:weapp
```

## 发布

打开微信开发者工具, 项目运行选择项目目录下的 `dist` 文件夹, 然后按照常规发布小程序操作。

## 拓展阅读

- [Taro 安装与运行](https://taro-docs.jd.com/taro/docs/GETTING-STARTED.html)
