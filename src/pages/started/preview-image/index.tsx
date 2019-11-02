import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { ImagePreview } from '@/components';
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
    navigationBarTitleText: '图片展示',
  }

  static defaultProps: Props = {}

  constructor(props: Props) {
    super(props);

    this.state = {
      images: [
        'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
        'https://storage.360buyimg.com/mtd/home/331543234387025.jpg',
        'https://storage.360buyimg.com/mtd/home/221543234387016.jpg',
        'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
        'https://storage.360buyimg.com/mtd/home/331543234387025.jpg',
        'https://storage.360buyimg.com/mtd/home/221543234387016.jpg',
      ],
    } as State;
  }

  render(): object {
    const { images } = this.state;

    return (
      <View className="container">
        <View className="demo">
          <View className="demo-title">剩余张数</View>
          <View className="demo-content">
            <ImagePreview
              images={images}
              tipsText="left"
            />
            <View className="space" />
            <ImagePreview
              images={images}
              length={2}
              tipsText="left"
            />
          </View>
        </View>

        <View className="divider" />

        <View className="demo">
          <View className="demo-title">全部张数</View>
          <View className="demo-content">
            <ImagePreview
              images={images}
              tipsText="count"
            />
            <View className="space" />
            <ImagePreview
              images={images}
              length={2}
              tipsText="count"
            />
          </View>
        </View>

        <View className="divider" />

        <View className="demo">
          <View className="demo-title">没提示信息</View>
          <View className="demo-content">
            <ImagePreview
              images={images}
              tipsText={false}
            />
            <View className="space" />
            <ImagePreview
              images={images}
              length={2}
              tipsText={false}
            />
            <View className="space" />
            <ImagePreview
              images={images}
              length={images.length}
              tipsText={false}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Index as ComponentType<Props>;
