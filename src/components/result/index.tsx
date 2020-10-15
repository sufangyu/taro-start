import Taro, { FC } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.scss';
import icSuccess from './icons/success.png';
import icFail from './icons/fail.png';
import icWarning from './icons/warning.png';

interface Props {
  /** 类型 */
  type?: 'success' | 'fail' | 'warning';
  /** 图标地址 */
  imgUrl?: string;
  /** title 文案 */
  title: string;
  /** message 文案 */
  message?: string;
}

const Index: FC<Props> = (props: Props) => {
  const { type, title, message } = props;
  // eslint-disable-next-line react/destructuring-assignment
  let imgUrl = props.imgUrl || '';
  const IMAGES_MAP = {
    success: icSuccess,
    fail: icFail,
    warning: icWarning,
  };
  
  // eslint-disable-next-line react/destructuring-assignment
  if (!props.imgUrl && type) {
    imgUrl = IMAGES_MAP[type];
  }

  return (
    <View className="comp-result">
      <View className="result-image"><Image src={imgUrl} /></View>
      <View className="result-title">{title}</View>
      <View className="result-message">{message}</View>
    </View>
  );
};

export default Index;
