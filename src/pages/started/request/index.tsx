import { FC, useRouter, useDidShow } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import {
  getList, postFn, putFn, deleteFn,
} from '@/api/test';
import { Query } from '@/router/types';

const Index: FC = () => {
  // 获取列表
  const handleGetList = async () => {
    const { data } = await getList({ page: 1 });
    (data?.list || []).forEach((item) => {
      console.log(`ID: ${item.id}, 标题: ${item.title}, 创建时间: ${item.createdAt}`);
    });
  };


  const { name = '', age = '' } = useRouter().params as any as Query;
  useDidShow(() => {
    console.log(`姓名: ${name}, 年龄: ${age}`);
  });

  return (
    <View className="container">
      <View>
        <Button type="primary" onClick={handleGetList}>GET 请求</Button>
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
