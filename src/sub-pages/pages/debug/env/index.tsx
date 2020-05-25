import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import classNames from 'classnames';

import {
  ENV_MAP, ENV_CURRENT, ENV_KEY_DEFAULT, IEnvConfig,
} from '@/config';

import './index.scss';

interface Props {
  switchEnvStore?: any;
}

interface State {
  /**
   * 环境名称
   *
   * @type {string}
   * @memberof State
   */
  envName: string;
  /**
   *环境值
   *
   * @type {string}
   * @memberof State
   */
  envValue: string;
}

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

    this.state = {
      envName: '',
      envValue: '',
    } as State;
  }

  componentWillMount() {}

  componentDidMount() {
    this.setCurrentEnv(ENV_CURRENT);
  }

  componentWillUnmount() {}

  // eslint-disable-next-line react/sort-comp
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

    this.setCurrentEnv(env);
  }

  /**
   * 重置环境
   *
   * @memberof Index
   */
  handleResetEnv() {
    const { switchEnvStore } = this.props;
    const env = ENV_MAP.find(item => item.value === ENV_KEY_DEFAULT) as IEnvConfig;

    switchEnvStore.resetEnv();
    Taro.showModal({
      title: '提示',
      content: `已重置默认环境(${env?.name}), 请关闭小程序进程重进`,
      showCancel: false,
    });

    this.setCurrentEnv(env);
  }

  /**
  /**
   * 设置环境
   *
   * @param env
   * @memberof Index
   */
  setCurrentEnv(env: IEnvConfig) {
    const { name, value } = env;
    this.setState({
      envName: name,
      envValue: value,
    });
  }

  render() {
    const { envName, envValue } = this.state;
    return (
      <View className="container debug-container">
        <View className="env-current">
          <View className="value">{envName}({envValue})</View>
          <View className="label">当前环境</View>
        </View>
        <View className="env-list">
          <View
            className="env-item"
            onClick={() => {
              this.handleResetEnv();
            }}
          >
            重置默认环境
          </View>
          {
            ENV_MAP.map((env, index) => {
              const key = `env-${index}`;
              const envItemClasses = classNames({
                'env-item': true,
                actived: env.value === envValue,
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
