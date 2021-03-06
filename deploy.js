const ci = require('miniprogram-ci')
const yargs = require('yargs')
const argv = yargs.argv

// 开发版: npm run deploy -- --type=develop --v=1.1.1 --robot=1 --desc=我是描述
// 体验版: npm run deploy -- --type=trial --v=1.1.1 --robot=1 --desc=我是描述

;(async () => {
  const { type = 'develop', v: version, robot = 2, desc } = argv;
  console.log(`type: ${type}`);
  console.log(`version: ${version}`);
  console.log(`desc: ${desc}`);
  console.log(`robot: ${robot}`);

  const project = new ci.Project({
    appid: 'wx71816a8ee509f483',
    type: 'miniProgram',
    projectPath: 'dist/',
    privateKeyPath: 'private.wx71816a8ee509f483.key',
    ignores: ['node_modules/**/*'],
  });

  const defaults = {
    project,
    desc,
    setting: {
      es6: false,
      urlCheck: true,
      postcss: false,
      minified: false
    },
    // onProgressUpdate: console.log,
  };

  switch (type) {
    case 'develop':
      const previewConfig = Object.assign({}, defaults, {
        qrcodeFormat: 'image',
        qrcodeOutputDest: `qrcode/preview-qrcode-v${version}.jpg`,
        robot,
      });
      await ci.preview(previewConfig);
      break;
    case 'trial':
      const uploadConfig = Object.assign({}, defaults, {
        version,
        robot: 1,
      });
      await ci.upload(uploadConfig);
      break;
    default:
      break;
  }

})();
