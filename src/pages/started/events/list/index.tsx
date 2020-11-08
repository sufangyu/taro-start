import Taro, { FC, useState } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { EventBubs, RefreshListCallback } from '@/events';
import { gotoPage, PATH_CONFIG } from '@/router';
import { useEvents } from '@/hooks';
import './index.scss';


const Index: FC = () => {
  const [person, setPerson] = useState({
    name: '张三疯',
    age: 18,
  });
  useEvents<RefreshListCallback>(EventBubs.刷新列表, (args) => {
    console.log('设置用户信息', args);
    setPerson((prevState) => ({
      ...prevState,
      ...args,
    }));
  });

  return (
    <View className="container">
      <View>姓名：{person.name}，年龄：{person.age}</View>
      <Button
        onClick={() => {
          gotoPage({
            url: PATH_CONFIG.started.eventsDetail,
          });
        }}
      >
        查看详情
      </Button>
    </View>
  );
};

Index.config = {
  navigationBarTitleText: '事件总线',
};
