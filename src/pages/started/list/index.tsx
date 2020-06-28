import Taro, { Config, useState } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { useList } from '@/hooks';
import { getTopics } from '@/api/test';

import './index.scss';

function Index() {
  const [page, setPage] = useState(1);
  const { list } = useList({
    initList: [],
    initQuery: {
      page,
      limit: 10,
    },
    fetch: getTopics,
  });
  console.log(list);

  return (
    <View className="container">
      <Button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        下一頁
      </Button>
      {
        list.map((item, index) => {
          const key = `item - ${index}`;
          return (
            <View className="topic-item" key={key}>
              {item.title}
            </View>
          );
        })
      }
    </View>
  );
}

Index.config = {
  navigationBarTitleText: '列表',
} as Config;

export default Index;
