import Taro, { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

interface IProps {
  /** 子元素 */
  children?: JSX.Element | JSX.Element[] | string;
  /** 点击触发时间 */
  onClick?: Function;
}

const Index: FC<IProps> = (props: IProps) => {
  const { onClick } = props;
  const handleClick = (...args: any[]) => {
    if (typeof onClick === 'function') {
      onClick(...args);
    }
  };

  return (
    <View
      className="fe-actionsheet__item"
      onClick={handleClick}
    >
      {
        // eslint-disable-next-line react/destructuring-assignment
        props.children
      }
    </View>
  );
};

export default Index;
