---
title: 项目文档
lang: zh-CN
home: true
description: 多端开发解决方案
actionText: 起步 →
actionLink: ./guide/
features:
- title: 组件化
  details: 与 React 一致的组件化思想，生命周期与 React 保持一致，同时支持使用 JSX 语法，可获得和 React 一致的开发体验
- title: 强大
  details: 支持第三方依赖、ES5+ 规范、SASS、Redux 或 MobX 状态管理, 异步 API Promise 化
- title: 多端开发
  details: 支持开发 微信/百度/支付宝/字节跳动/QQ/京东小程序 、快应用、 H5 端 以及 移动端（React Native）
---

# 快速了解

## 安装

```bash
# install with yarn
yarn install

# install with npm
npm install
```

## 启动
```bash
# 本地开发
npm run dev:weapp
# 风格校验
npm run lint:all
```

## 构建
```bash
# 打包小程序
npm run build:weapp

# 打包指定环境
# npm run build:weapp -- --env=$value
npm run build:weapp -- --env=test
```


## 快速创建页面/组件
```bash
# 页面
npm run create:page mine
npm run create:page order/list
# 组件
npm run create:comp button
```
