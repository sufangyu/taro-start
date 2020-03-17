import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { gotoPage, PATH_CONFIG } from '@/router';

import iconDebug from './icon-debug.png';

import './index.scss';

type Props = {
  [propName: string]: any;
}

type State = {}

interface Index {
  props: Props;
  state: State;
}


class Index extends Component<Props, State> {
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

  componentWillReact() {}

  render(): object {
    // 开发版: develop, 体验版: trial, 正式版: release
    // eslint-disable-next-line no-undef
    const { envVersion } = __wxConfig;

    return (
      <View className="debug-env">
        {
          ['develop', 'trial'].includes(envVersion)
            ? (
              <Image
                src={iconDebug}
                className="debug-env-entry"
                onClick={() => {
                  gotoPage({
                    url: PATH_CONFIG.debug.env,
                  });
                }}
              />
            )
            : null
        }
      </View>
    );
  }
}

export default Index as ComponentType<Props>;
