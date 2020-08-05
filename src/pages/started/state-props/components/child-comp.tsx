import { FC } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';

interface IProps {
  /** 累计器 */
  count: number;
  /** 累减回调函数 */
  onMinus?: () => void;
}

const Index: FC<IProps> = (props: IProps) => {
  const { count, onMinus } = props;

  return (
    <View className="container">
      <View>
        <Button
          size="mini"
          onClick={() => {
            onMinus!();
          }}
        >
          累减
        </Button>
        <Text>{count}</Text>
      </View>
    </View>
  );
};

export default Index;
