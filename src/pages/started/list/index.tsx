import Taro, { FC, useState } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { useList } from '@/hooks';
import { List } from '@/models/test';
import { getList } from '@/api/test';

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
    isLasted,
    pagination,
    onSearch,
    getListNext,
  } = useList<List>({
    initPage: 1,
    initSize: 10,
    query,
    fetch: getList,
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
      >
        参数更改
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
            <View className="list-item" key={key}>
              {item.title}
            </View>
          );
        })
      }

      {isLasted && <View className="data-lasted">没有更多数据了</View>}
    </View>
  );
};

Index.config = {
  navigationBarTitleText: '列表',
  enablePullDownRefresh: true,
};
