import Taro, { FC } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { navigateBack } from '@/router';
import { EventBubs, RefreshListCallback } from '@/events';
import './index.scss';


const Index: FC = () => {
  return (
    <View className="container">
      <Button
        onClick={() => {
          Taro.events.trigger(EventBubs.刷新列表, {
            name: 'zsf',
            age: 20,
          } as RefreshListCallback);
          navigateBack();
        }}
      >
        重新设置用户信息, 返回上一页
      </Button>
    </View>
  );
};

Index.config = {
  navigationBarTitleText: '事件总线 - 设置',
};
