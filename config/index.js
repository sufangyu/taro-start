const path = require('path')
const yargs = require('yargs')
const argv = yargs.argv

// 强制使用 ES2017 hack
// https://github.com/NervJS/taro/issues/5286
const typescript = require('typescript')

const oldTsTranspile = typescript.transpile
typescript.transpile = function ConfigLocalTranspile(input, compilerOptions, fileName, diagnostics, moduleName) {
  compilerOptions.target = typescript.ScriptTarget.ES2017
  return oldTsTranspile.call(this, input, compilerOptions, fileName, diagnostics, moduleName)
}

const config = {
  projectName: 'start',
  date: '2019-10-17',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  babel: {
    sourceMap: true,
    presets: [['env', { modules: false }]],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      ['transform-runtime', {
        "helpers": false,
        "polyfill": false,
        "regenerator": true,
        "moduleName": 'babel-runtime'
      }]
    ]
  },
  env: {
    API_ENV: argv.env
  },
  plugins: {},
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
  },
  defineConstants: {
  },
  copy: {
    patterns: [
      {
        from: 'src/sitemap.json',
        to: 'dist/sitemap.json'
      }
    ],
    options: {
    }
  },
  mini: {
    webpackChain (chain, webpack) {},
    cssLoaderOption: {},
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    webpackChain (chain, webpack) {},
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
