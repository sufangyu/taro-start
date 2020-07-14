import Taro, { Config, useState } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { useList } from '@/hooks';
// import { IParamsTopics, ITopic } from '@/models/test';
import { getTopics } from '@/api/test';

import './index.scss';

function Index() {
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
  } = useList(
    {
      initPage: 1,
      initSize: 20,
      query,
      fetch: getTopics,
    },
  );

  return (
    <View className="container">
      <Button
        onClick={() => {
          setQuery((prevState) => {
            const newAge = prevState.age + 1;
            return {
              time: Date.now(),
              age: newAge,
            };
          });

          onSearch();
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
}

Index.config = {
  navigationBarTitleText: '列表',
  enablePullDownRefresh: true,
} as Config;

export default Index;
