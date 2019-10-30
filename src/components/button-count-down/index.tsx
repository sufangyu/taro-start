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
  time?: number,

  /**
   * 按钮文案
   *
   * @type {string}
   */
  label?: string,

  /**
   * 点击的回调函数
   *
   * @type {Function}
   */
  onClick?(): void,

  [propName: string]: any,
}

type State = {
  /**
   * 是否禁用
   *
   * @type {boolean}
   */
  disabled: boolean,

  /**
  * 当前倒计时
  *
  * @type {string}
  */
  time: number,

  /**
   * 按钮默认文案
   *
   * @type {string}
   */
  defaultLabel: string,
}

interface Index {
  props: Props,
  state: State,
}


/**
 * 倒计时组件
 *
 * 开始进行倒计时候, 需执行当前组件的 start 方法.
 * eg: this.refCountDown.current.start();
 *
 * @class Index
 * @extends {Component<Props, State>}
 */
class Index extends Component<Props, State> {
  timer: any;

  static defaultProps: Props = {
    time: 60,
    label: '获取验证码',
  }

  constructor(props: Props) {
    super(props);

    const { time } = props;

    this.state = {
      disabled: false,
      time: time ? (time + 1) : time,
      defaultLabel: props.label,
    } as State;
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentWillReact() {}

  /**
   * 点击事件的触发
   *
   * @returns
   * @memberof Index
   */
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

  /**
   * 开始倒计时
   *
   * @memberof Index
   */
  start() {
    this.setState({
      disabled: true,
    });
    this.countDown();
  }

  /**
   * 停止倒计时
   *
   * @memberof Index
   */
  stop() {
    const { time, disabled } = this.props;
    clearTimeout(this.timer);
    this.setState({
      time,
      disabled,
    } as State);
  }

  /**
   * 倒计时
   *
   * @private
   * @returns {void}
   * @memberof Index
   */
  private countDown(): void {
    const { time } = this.state;
    if (time <= 0) {
      // 停止
      this.stop();
      return;
    }

    const nowTime = time - 1;
    this.setState({
      time: nowTime,
    });
    this.timer = setTimeout(() => {
      this.countDown();
    }, 1000);
  }

  render(): any {
    const { time, disabled, defaultLabel } = this.state;
    const buttonLabel = disabled ? `${time}s` : defaultLabel;

    return (
      <Button
        onClick={() => {
          this.handleClick();
        }}
      >
        {buttonLabel}
      </Button>
    );
  }
}

export default Index as ComponentType<Props>;
