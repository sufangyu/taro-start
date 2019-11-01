import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { ImagePicker } from '@/components';
import './index.scss';

type Props = {}

type State = {
  /**
   * 图片集合
   *
   * @type {string[]}
   */
  images: string[],
}

interface Index {
  props: Props,
  state: State,
}

@inject('globalStore')
@observer
class Index extends Component<Props, State> {
  config: Config = {
    navigationBarTitleText: '图片上传',
  }

  static defaultProps: Props = {}

  constructor(props: Props) {
    super(props);

    this.state = {
      images: [],
    } as State;
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentWillReact() {}

  render(): object {
    return (
      <View className="container">
        <ImagePicker />
      </View>
    );
  }
}

export default Index as ComponentType<Props>;
