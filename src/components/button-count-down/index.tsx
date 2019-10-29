import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Button } from '@tarojs/components';

import './index.scss';

type Props = {
  /**
   * 倒计时的时间
   *
   * @type {number}
   */
  timer: number,

  /**
   * 按钮默认文案
   *
   * @type {string}
   */
  label?: string,

  /**
   * 当前组件对象
   *
   * @type {*}
   */
  ref?: any,

  /**
   * 点击的回调函数
   *
   * @type {Function}
   */
  onClick?: Function,
}

type State = {
  /**
   * 是否禁用
   *
   * @type {boolean}
   */
  disabled: boolean,
}

interface Index {
  props: Props,
  state: State,
}

class Index extends Component<Props, State> {
  static defaultProps: Props = {
    timer: 10,
    label: '获取验证码',
  }

  constructor(props: Props | undefined) {
    super(props);

    this.state = {
      disabled: false,
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentWillReact() {}

  handleClick() {
    const { disabled } = this.state;
    const { onClick } = this.props;
    if (disabled) {
      return;
    }

    if (onClick) {
      onClick();
    }
  }

  start() {
    console.log('开始倒计时');
    this.setState({
      disabled: true,
    });
  }

  render(): any {
    const { timer, label } = this.props;
    console.log('timer =>>', timer);

    return (
      <Button
        onClick={() => {
          this.handleClick();
        }}
      >
        {label} - {timer}
      </Button>
    );
  }
}

export default Index as ComponentType<Props>;
