import Taro, { FC, useState, useEffect } from '@tarojs/taro';
import { useDispatch } from '@tarojs/redux';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import { EnvDispatch } from '@/reducers/debug/types';
import {
  ENV_MAP, ENV_CURRENT, ENV_KEY_DEFAULT, IEnvConfig,
} from '@/config';

import './index.scss';

const Index: FC = () => {
  const dispatch = useDispatch<EnvDispatch>();
  const [envName, setEnvName] = useState('');
  const [envValue, setEnvValue] = useState('');

  const setCurrentEnv = (env: IEnvConfig) => {
    const { name, value } = env;
    setEnvName(name);
    setEnvValue(value);
  };

  /**
   * 切换 环境
   *
   * @param {*} env 环境信息
   * @memberof Index
   */
  const handleSwitchEnv = (env: IEnvConfig) => {
    const { name, value } = env;

    dispatch({
      type: 'SET_ENV',
      payload: {
        envCode: value,
      },
    });

    Taro.showModal({
      title: '提示',
      content: `已切换为${name}环境, 请关闭小程序进程重进`,
      showCancel: false,
    });

    setCurrentEnv(env);
  };

  /**
   * 重置环境
   *
   * @memberof Index
   */
  const handleResetEnv = () => {
    const env = ENV_MAP.find(item => item.value === ENV_KEY_DEFAULT) as IEnvConfig;

    dispatch({
      type: 'RESET_ENV',
      payload: {
        envCode: '',
      },
    });


    Taro.showModal({
      title: '提示',
      content: `已重置默认环境(${env?.name}), 请关闭小程序进程重进`,
      showCancel: false,
    });

    setCurrentEnv(env);
  };

  useEffect(() => {
    setCurrentEnv(ENV_CURRENT);
  }, []);

  return (
    <View className="container debug-container">
      <View className="env-current">
        <View className="value">{envName}({envValue})</View>
        <View className="label">当前环境</View>
      </View>
      <View className="env-list">
        <View
          className="env-item"
          onClick={handleResetEnv}
        >
          重置默认环境
        </View>
        {
          ENV_MAP.map((env, index) => {
            const key = `env-${index}`;
            const envItemClasses = classNames({
              'env-item': true,
              active: env.value === envValue,
            });

            return (
              <View
                className={envItemClasses}
                key={key}
                onClick={() => handleSwitchEnv(env)}
              >
                {env.name} - { env.value}
              </View>
            );
          })
        }
      </View>
    </View>
  );
};

Index.config = {
  navigationBarTitleText: '切换环境',
};
