import Taro, { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { formatStatus } from '@/format';
import { parseTime } from '@/utils/date';
import './index.scss';

const Index: FC = () => {
  return (
    <View className="container">
      <View>用户状态 - YES：{formatStatus('YES')}</View>
      <View>用户状态 - NO：{formatStatus('NO')}</View>
      <View>用户状态 - `xxx`：{formatStatus('xxx')}</View>
      <View>格式化时间：{parseTime(new Date())}</View>
    </View>
  );
};

Index.config = {
  navigationBarTitleText: '数据格式化',
};
