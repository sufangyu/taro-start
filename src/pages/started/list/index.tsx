import Taro, { Config } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { useList } from '@/hooks';
import { getTopics } from '@/api/test';

import './index.scss';

function Index() {
  const {
    list,
    loading,
    pagination,
    getListNext,
  } = useList({
    initPage: 1,
    initSize: 20,
    fetch: getTopics,
  });

  return (
    <View className="container">
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
