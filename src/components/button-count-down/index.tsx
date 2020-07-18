import Taro, {
  FC, useState, useCallback, useEffect, useRef,
} from '@tarojs/taro';
import { Button } from '@tarojs/components';

import './index.scss';

interface IProps {
  /** 倒计时时间 */
  countTime?: number;
  /** 按钮默认文案 */
  label?: string;
  onClick?: (cb: Function) => void;
}

const Index: FC<IProps> = (props: IProps) => {
  const { countTime = 60, label = '获取验证码', onClick = () => {} } = props;
  const intervalRef = useRef<any>(null);
  const [count, changeCount] = useState(0);


  /** 开始倒计时 */
  const startCountDown = useCallback(() => {
    changeCount(countTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  /** 获取短信验证码 */
  const handleGetCaptcha = () => {
    if (onClick) {
      onClick(startCountDown);
    }
  };


  useEffect(() => {
    if (count === countTime) {
      intervalRef.current = setInterval(() => {
        changeCount((prevCount) => prevCount - 1);
      }, 1000);
    } else if (count === 0) {
      clearInterval(intervalRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);


  // 组件卸载时清除计时器
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Button
      disabled={!!count}
      onClick={handleGetCaptcha}
    >
      {count ? `${count} s` : label}
    </Button>
  );
};

export default Index;
