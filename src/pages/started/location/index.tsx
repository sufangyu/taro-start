import Taro, { Config } from '@tarojs/taro';
import { View } from '@tarojs/components';

import useGetLocation from '@/hooks/use-get-location';

export default function Index() {
  const { location } = useGetLocation();

  // usePullDownRefresh(() => {
  //   console.log('usePullDownRefresh');
  // });

  return (
    <View>
      地址: { location || '-' }
    </View>
  );
}

Index.config = {
  navigationBarTitleText: '获取地理位置',
  // enablePullDownRefresh: true,
} as Config;
