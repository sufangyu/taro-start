import { FC } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { List } from '@/models/test';
import { getList } from '@/api/test';
import { useList } from '@/hooks';

import './index.scss';

const Index: FC = () => {
  const { list } = useList<List>({
    initSize: 10,
    fetch: getList,
  });

  return (
    <View className="container">
      <View className="header">固定内容</View>

      <View className="content">
        {
          list.map((item, idx) => {
            const key = `key-${idx}`;
            return (
              <View
                className="list"
                key={key}
              >
                <Text>{item.title}</Text>
              </View>
            );
          })
        }
      </View>

    </View>
  );
};

Index.config = {
  navigationBarTitleText: '下拉刷新',
  enablePullDownRefresh: true,
};
