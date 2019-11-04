import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';

import './index.scss';

type Props = {}

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

  render(): object {
    return (
      <View className="list-image">
        <View className="list-item">
          <Image mode="aspectFill" src="https://storage.360buyimg.com/mtd/home/111543234387022.jpg" />
        </View>
        <View className="list-item">
          <Image mode="aspectFill" src="https://storage.360buyimg.com/mtd/home/331543234387025.jpg" />
        </View>
        <View className="list-item">
          <Image mode="aspectFill" src="https://storage.360buyimg.com/mtd/home/221543234387016.jpg" />
        </View>
      </View>
    );
  }
}

export default Index as ComponentType<Props>;
