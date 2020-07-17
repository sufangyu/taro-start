import { FC, useState } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import Child from './components/child-comp';
import './index.scss';

const Index: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <View className="container">
      <View className="demo">
        <View className="demo-title">state:</View>
        <Button
          size="mini"
          onClick={() => setCount(count + 1)}
        >
          累加
        </Button>
        <Text>{count}</Text>
      </View>

      {/* 组件 Props 属性 */}
      <View className="demo">
        <View className="demo-title">props</View>
        <Child
          count={count}
          onMinus={() => setCount(count - 1)}
        />
      </View>
    </View>
  );
};

Index.config = {
  navigationBarTitleText: 'State & Props (Hook)',
};
