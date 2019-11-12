## Taro-start
Taro 小程序通用模板， 开箱即用


## 安装、开发、构建

```bash
# install with yarn
yarn install

# 开发
npm run dev:weapp
npm run lint:all

# 构建
npm run build:weapp
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
├─ config                         # 脚手架的配置
│   ├─ dev.js
│   ├─ index.js
│   └─ prod.js
├─ dist                           # 项目输出目录
├─ src
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
│   │   └─ store-key.ts           # 本地存储
│   ├─ decorators                 # 公用装饰器
│   │   ├─ check-login.ts         # 校验是否登录. 针对函数
│   │   ├─ switch-env.ts          # 切换环境
│   │   └─ with-login.ts          # 校验是否登录. 针对页面
│   ├─ interface                  # 公用的接口. 暂时保留
│   ├─ middleware                 # 中间件
│   ├─ pages                      # 页面目录. 尽量按模块划分
│   │   ├─ account
│   │   │   ├─ login
│   │   │   └─ welcome
│   │   ├─ home
│   │   └─ mine
│   ├─ router                    # 路由相关函数 & 页面路径配置
│   │   ├─ index.ts
│   │   └─ path.ts
│   ├─ store                     # 全局状态
│   │   ├─ account.ts            # 账号
│   │   ├─ global.ts             # 全局
│   │   ├─ index.ts              # 入口文件
│   │   └─ switch-env.ts
│   ├─ styles
│   │   ├─ index.scss            # 样式入口文件
│   │   └─ var.scss              # 全局样式变量
│   ├─ template-empty            # 空模板文件
│   │   ├─ index.scss
│   │   └─ index.tsx
│   ├─ utils                     # 工具类
│   │   ├─ request-help.ts       # 网络请求辅助函数
│   │   └─ request.ts            # 网络请求
│   ├─ app.scss                  # 全局样式
│   ├─ app.tsx                   # 项目入口文件
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

> **注意: 除了页面外的 `tsx` 组件文件采取首字母大写的驼峰命名, 例如：**
> ```
> Menu.tsx
> ```


**css 变量命名规范**
统一使用kebab-case(小写短横线)命名规范。

```html
<!-- tsx 文件 -->
<div className="app-home-vue">
</div>

<!-- 样式文件 -->
.app-home-vue {}
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
| Page.onLoad | componentWillMount |
| onShow | componentDidShow |
| onHide | componentDidHide |
| onReady | componentDidMount |
| onUnload | componentWillUnmount |
| onError | componentDidCatchError |
| App.onLaunch | componentWillMount |
| Component.created | componentWillMount |
| attached | componentDidMount |
| ready | componentDidMount |
| detached | componentWillUnmount |
| moved | 保留 |


## TODO
- 环境切换(小程序环境控制是否显示触发的按钮)
