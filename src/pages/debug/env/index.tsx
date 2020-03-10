import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import classNames from 'classnames';

import { ENV_MAP, ENV_CURRENT } from '@/config';

import './index.scss';

interface Props {
  switchEnvStore?: any;
}

interface State {}

interface Index {
  props: Props;
  state: State;
}

@inject('globalStore', 'switchEnvStore')
@observer
class Index extends Component<Props, State> {
  config: Config = {
    navigationBarTitleText: '切换环境',
  }

  static defaultProps: Props = {}

  constructor(props: Props) {
    super(props);

    this.state = {} as State;
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  /**
   * 切换 环境
   *
   * @param {*} env
   * @memberof Index
   */
  handleSwitchEnv(env: any) {
    const { switchEnvStore } = this.props;
    const { name, value } = env;

    switchEnvStore.setEnv(value);
    Taro.showModal({
      title: '提示',
      content: `已切换为${name}环境, 请关闭小程序进程重进`,
      showCancel: false,
    });
  }

  render() {
    return (
      <View className="container debug-container">
        <View className="env-current">
          <View className="value">{ENV_CURRENT.name}({ENV_CURRENT.value})</View>
          <View className="label">当前环境</View>
        </View>
        <View className="env-list">
          {
            ENV_MAP.map((env, index) => {
              const key = `env-${index}`;
              const envItemClasses = classNames({
                'env-item': true,
                actived: env.value === ENV_CURRENT.value,
              });

              return (
                <View
                  className={envItemClasses}
                  key={key}
                  onClick={() => {
                    this.handleSwitchEnv(env);
                  }}
                >
                  {env.name} - { env.value}
                </View>
              );
            })
          }
        </View>
      </View>
    );
  }
}

export default Index as ComponentType<Props>;
