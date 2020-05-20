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
  images: any[];
}

interface Index {
  props: Props;
  state: State;
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

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        images: [
          { url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg' },
          { url: 'https://storage.360buyimg.com/mtd/home/331543234387025.jpg' },
          // { url: 'https://storage.360buyimg.com/mtd/home/221543234387016.jpg' },
        ],
      });
    }, 1500);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentWillReact() {}

  render(): object {
    const { images } = this.state;
    return (
      <View className="container">
        <ImagePicker
          list={images}
          multiSelect={2}
          onChange={(list: any) => {
            console.log(list);
          }}
        />
      </View>
    );
  }
}

export default Index as ComponentType<Props>;
