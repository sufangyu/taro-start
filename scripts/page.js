/**
 *  pages 页面快速生成脚本
 *
 *  npm run create:page '文件夹' or '路径/文件夹'
*/

const fs = require('fs');
const { mkdirsSync } = require('./utils');
const dirName = process.argv[2];

if (!dirName) {
  console.warn('页面名称不能为空');
  console.log('eg: npm run tem test');
  process.exit(0);
}

const dirname = `./src/pages/${dirName}`;
const isExist = fs.existsSync(dirname);
if (isExist) {
  console.warn(`页面(${dirName})已存在`);
  process.exit(0);
}


// 模板
const indexTep = `import Taro, { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { useDispatch, useSelector } from '@tarojs/redux';
import { RootState } from '@/store';
import { AccountState } from '@/reducers/account/types';
import './index.scss';


const Index: FC = () => {
  // redux dispatch
  const dispatch = useDispatch();
  // redux store
  const { account } = useSelector<RootState, AccountState>((state) => state.account);
  console.log(dispatch, account);


  return (
    <View className="container">
      This is empty page
    </View>
  );
};

Index.config = {
  navigationBarTitleText: '',
};
`;

// scss 模板
const scssTep = ``;


mkdirsSync(dirname); // mkdir $1
process.chdir(dirname); // cd $1
fs.writeFileSync(`index.tsx`, indexTep); // write tsx
fs.writeFileSync(`index.scss`, scssTep); // write scss

console.log('创建成功');
process.exit(0);
