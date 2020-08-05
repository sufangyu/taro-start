import { FC } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import {
  PATH_CONFIG, gotoPage, reLaunch, getCurrentPage, navigateBack,
} from '@/router';

const Index: FC = () => {
  return (
    <View className="container">
      <Button
        type="primary"
        onClick={() => {
          gotoPage({
            url: PATH_CONFIG.started.request,
          });
        }}
      >
        <Text>跳转页面</Text>
      </Button>

      <Button
        type="primary"
        onClick={() => {
          gotoPage({
            url: `${PATH_CONFIG.started.request}?age=18`,
            query: {
              name: '张三疯',
              age: 28,
            },
          });
        }}
      >
        <Text>跳转页面 - 传参</Text>
      </Button>

      <Button
        type="primary"
        onClick={() => {
          gotoPage({
            url: PATH_CONFIG.started.request,
            mode: 'replace',
          });
        }}
      >
        <Text>重定向页面</Text>
      </Button>

      <Button
        type="primary"
        onClick={() => {
          navigateBack();
        }}
      >
        <Text>返回上一页</Text>
      </Button>

      <Button
        type="primary"
        onClick={() => {
          gotoPage({
            url: PATH_CONFIG.home,
          });
        }}
      >
        <Text>跳转页面 - tabBar</Text>
      </Button>

      <Button
        type="primary"
        onClick={() => {
          reLaunch({
            url: PATH_CONFIG.home,
          });
        }}
      >
        <Text>打开页面 - 关闭其他</Text>
      </Button>

      <Button
        type="primary"
        onClick={() => {
          const page = getCurrentPage(0);
          console.log('page =>>', page);
        }}
      >
        <Text>获取当前页面对象</Text>
      </Button>
    </View>
  );
};

Index.config = {
  navigationBarTitleText: '页面跳转',
};
