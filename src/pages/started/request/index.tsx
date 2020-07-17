import { FC } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import {
  getTopics, IParamsTopics,
  postFn, putFn, deleteFn,
} from '@/api/test';

const Index: FC = () => {
  /**
   * 获取主题列表
   *
   */
  const handleGetTopics = async () => {
    const params: IParamsTopics = {
      page: 1,
      limit: 10,
      tab: 'all',
    };
    const { data } = await getTopics(params);
    data.forEach(item => {
      console.log(`ID: ${item.id}, 创建时间: ${item.create_at}`);
    });
  };

  return (
    <View className="container">
      <View>
        <Button type="primary" onClick={handleGetTopics}>GET 请求</Button>
        <Button type="primary" onClick={postFn}>POST 请求</Button>
        <Button type="primary" onClick={putFn}>PUT 请求</Button>
        <Button type="primary" onClick={deleteFn}>DELETE 请求</Button>
      </View>
    </View>
  );
};

Index.config = {
  navigationBarTitleText: '网络请求',
};
