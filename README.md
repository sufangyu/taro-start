## Taro-start
Taro 小程序通用模板， 开箱即用


## 安装、开发、构建

```bash
# install with yarn
yarn install

# 开发
npm run dev

# 构建
npm run build:weapp

# 构建指定环境
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


## 目录结构
```bash
.
├─ config                         # 脚手架配置
│   ├─ dev.js
│   ├─ index.js
│   └─ prod.js
├─ dist                           # 项目输出目录
├─ src
│   ├─ analysis                   # 第三方统计分析
│   ├─ api                        # 请求接口统一管理
│   ├─ assets                     # 资源统一管理
│   │   └─ images                 # 图片资源
│   │       ├─ tabbar             # tabbar 的图标
│   │       └─ ...
│   ├─ components                 # 组件
│   │   ├─ ...                    # 组件入口文件
│   │   └─ index.ts
│   ├─ config                     # 项目开发配置
│   │   └─ index.ts
│   ├─ constants                  # 公用常量统一管理
│   │   ├─ events                 # 自定义时间 CODE 的枚举
│   │   └─ store-key.ts           # 本地存储 KEY
│   ├─ hooks                      # 自定义 hooks
│   │   ├─ check-login.ts         # 操作前校验是否登录
│   │   ├─ geocoder.ts            # 地理信息获取
│   │   ├─ index.ts               # 自定义 hooks 入口文件
│   │   ├─ input.ts               # 监听处理输入值
│   │   └─ list.ts                # 列表
│   ├─ models                     # 公用、业务模块接口定义
│   ├─ pages                      # 页面目录. 尽量按模块划分
│   │   ├─ account
│   │   │   ├─ login
│   │   │   └─ welcome
│   │   ├─ home
│   │   ├─ mine
│   │   └─ started
│   ├─ reducers                  # redux 状态管理的 reducers
│   │   ├─ account.ts            # 帐号信息
│   │   └─ debug.ts              # 调试
│   ├─ request
│   │   ├─ index.ts              # 网络请求函数封装
│   │   ├─ interceptors.ts       # 请求、响应拦截
│   │   └─ type.ts               # 相关类型、接口定义
│   ├─ router
│   │   ├─ index.ts              # 路由相关函数 & 页面路径配置
│   │   └─ path.ts               # 页面路径配置
│   ├─ store                     # 全局状态
│   │   └─ index.ts              # 入口文件
│   ├─ styles
│   │   ├─ index.scss            # 样式入口文件
│   │   └─ var.scss              # 全局样式变量
│   ├─ sub-pages                 # 分包
│   ├─ uma                       # 友盟统计
│   ├─ utils                     # 工具类
│   │   ├─ verification          # 表单校验类
│   │   ├─ index.t               # 常用工具函数
│   │   └─ qqmap-wx-jssdk.js     # 腾讯地图 SDK
│   ├─ app.scss                  # 全局样式
│   ├─ app.tsx                   # 项目入口文件
│   ├─ sitemap.json              # 站点配置. 面向爬虫
│   └─ index.html                # H5 的开始文件
├─ .eslintignore                 # eslint 校验忽略规则配置
├─ .eslintrc                     # eslint 校验配置
├─ package.json
├─ project.config.json           # 项目配置
├─ README.md
├─ tsconfig.json
└─ yarn.lock
```


## 推荐规范

### 命名

**文件后缀**

普通 JS 文件的后缀为 `.ts`, 页面和组件文件的后缀为 `.tsx` 

**目录、文件命名**

全部采用小写方式， 以中划线分隔。
例: scripts, retina-sprites.scss, data.js, actionsheet.ts, actionsheet.tsx


**css 变量命名规范**
统一使用kebab-case(小写短横线)命名规范。

```html
<!-- tsx 文件 -->
<view className="app-home-taro">
</view>

<!-- 样式文件 -->
.app-home-taro {}
```

**js 变量命名规范**
统一使用camelCase（小写驼峰式）命名规范。

```js
let myName = 'zhangsanfeng';
```

### 属性书写
- 少于2个, 一行书写
- 超过2个则每个写一行, 最后一个尖括号占一行
 
```html
<!-- 少于 2 个 -->
<MenuItem :url="item.url" :actived="item.actived"></MenuItem>

<!-- 3 个以上 -->
<MenuItem
  :key="item.id"
  :url="item.url"
  :isLast="item.isLast"
  :actived="item.actived"
>{item.label}</MenuItem>
```


## 组件组织

- 基础 UI 组件统一放在 `src/components`, 并且通过 `src/components` 入口文件对外导出
- 页面业务组件放在对于页面下的 components 文件.


## 生命周期的对比

| 小程序 | Taro |
|-|-:|
| Page.onLoad | useEffect |
| onShow | useDidShow |
| onHide | useDidHide |
| onReady | useEffect |
| onUnload | useEffect |
| onError | ? |
| App.onLaunch | useEffect |
| Component.created | useEffect |
| attached | useEffect |
| ready | useEffect |
| detached | useEffect |
| moved | 保留 |
