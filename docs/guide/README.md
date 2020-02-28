# 项目介绍

## 目录结构

```bash
.
├─ config                  # 脚手架配置
├─ dist                    # 项目打包后目录
├─ docs                    # 文档说明
├─ scripts                 # 自定义脚本
├─ src
│  ├─ api                  # 请求函数与 API
│  │  └─ ***
│  ├─ assets               # 静态资源
│  │  ├─ images            # 图片
│  │  │  ├─ tabbar         # tabbar 图标
│  │  │  │  └─ ***
│  │  └─ ***
│  ├─ components           # 组件  
│  │  ├─ ***
│  │  └─ index.ts          # 组件入口文件
│  ├─ config               # 项目配置文件. 如: api 环境
│  │  └─ index.ts
│  ├─ constants            # 常量定义
│  │  └─ store-key.ts      # 本地缓存
│  ├─ decorators           # 装饰器
│  │  ├─ check-login.ts    # 操作前校验是否登录
│  │  ├─ switch-env.ts     # 环境切换
│  │  └─ with-login.ts     # 页面访问校验是否登录
│  ├─ interface            # 公用接口定义
│  │  └─ index.ts
│  ├─ model                # 模块定义
│  │  └─ ***
│  ├─ pages                # 页面. 按模块划分
│  │  └─ ***
│  ├─ router
│  │  ├─ index.ts          # 路由相关函数. 如: 页面调整、获取当前页面等
│  │  └─ path.ts           # 页面路径配置
│  ├─ store                # 状态管理
│  │  ├─ ***
│  │  └─ index.ts          # 状态管理入口文件
│  ├─ styles               # 样式
│  │  ├─ index.scss        # 公共样式
│  │  └─ var.scss          # 样式变量   
│  ├─ utils                # 工具类、函数
│  ├─ app.scss             # 全局样式
│  ├─ app.tsx              # 项目入口文件
│  └─ index.html           # 项目 web 入口文件
├─ .editorconfig
├─ ...
├─ package.json
├─ project.config.json     # 项目配置. 如: appid
├─ README.md
└─ tsconfig.json           # ts 配置
```

## 全局配置

在 `src/config` 提供了一下全局配置，例如:

### ENV_MAP

环境配置列表.
```js
[
  {
    name: '开发环境',
    value: 'dev',
    apiBase: {
      base: 'https://dev-api.baibu.la',
    },
  }
  ...,
]
```
- name 环境名称
- value 环境标记
- apiBase 环境对应的 api base 配置

### API_BASE_MAP

当前环境配置.
```js
{
  base: 'https://dev-api.baibu.la',
  ...,
},
```

## UI 框架

推荐使用 [Taro UI](https://taro-ui.jd.com/)
