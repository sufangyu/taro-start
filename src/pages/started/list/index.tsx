import Taro, { FC, useState } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { useList } from '@/hooks';
import { Topic } from '@/models/test';
import { getTopics } from '@/api/test';

import './index.scss';

const Index: FC = () => {
  const time = Date.now();
  const [query, setQuery] = useState({
    time,
    age: 18,
  });
  const {
    list,
    loading,
    pagination,
    onSearch,
    getListNext,
  } = useList<Topic>({
    initPage: 1,
    initSize: 20,
    query,
    fetch: getTopics,
  });

  return (
    <View className="container">
      <Button
        onClick={() => {
          // fix 值为前一次的
          const nextQuery = {
            ...query,
            time: Date.now(),
            age: query.age + 1,
          };
          setQuery((prevState) => ({
            ...prevState,
            ...nextQuery,
          }));

          onSearch(nextQuery);
        }}
      >参数更改
      </Button>
      <Button
        onClick={() => {
          getListNext();
        }}
      >
        下一页: {loading} - ({pagination.page}, {pagination.size})
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
};

Index.config = {
  navigationBarTitleText: '列表',
  enablePullDownRefresh: true,
};
