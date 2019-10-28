## TODO
- defaultProps  
- 环境切换(小程序环境控制是否显示触发的按钮)


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
│   ├─ config                     # 项目开发配置
│   │   └─ index.ts
│   ├─ constants                  # 公用常量的统一管理
│   │   └─ store-key.ts           # 本地存储
│   ├─ decorators                 # 公用装饰器
│   │   ├─ checkLogin.ts          # 校验是否登录. 针对函数
│   │   └─ withLogin.ts           # 校验是否登录. 针对页面
│   ├─ interface                  # 公用的接口. 暂时保留
│   ├─ middleware
│   ├─ pages                      # 页面目录. 尽量按模块划分
│   │   ├─ account
│   │   │   ├─ login
│   │   │   └─ welcome
│   │   ├─ home
│   │   ├─ mine
│   │   └─ template-empty        # 空模板文件
│   │       ├─ index.scss
│   │       └─ index.tsx
│   ├─ router                    # 路由相关函数 & 页面路径配置
│   │   ├─ index.ts
│   │   └─ path.ts
│   ├─ store                     # 全局状态
│   │   ├─ account.ts            # 账号
│   │   ├─ global.ts             # 全局
│   │   └─ index.ts              # 入口文件
│   ├─ utils                     # 工具类
│   │   ├─ request-help.ts       # 网络请求辅助函数
│   │   └─ request.ts            # 网络请求
│   ├─ app.scss                  # 全局样式
│   ├─ app.tsx                   # 项目入口文件
│   └─ index.html                # H5的开始文件
├─ .eslintignore
├─ .eslintrc
├─ package.json
├─ project.config.json           # 项目配置
├─ README.md
├─ tsconfig.json
└─ yarn.lock
```
