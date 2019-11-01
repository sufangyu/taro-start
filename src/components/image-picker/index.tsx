import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
// import List from './List';
import Uploader from './Uploader';

import './index.scss';

interface IImage {
  /**
   * 图片 ID
   *
   * @type {(string | number)}
   * @memberof IImage
   */
  id?: string | number,

  /**
   * 图片地址
   *
   * @type {string}
   * @memberof IImage
   */
  url: string,
}


type Props = {}

type State = {
  /**
   * 图片列表
   *
   * @type {IImage[]}
   */
  images: IImage[],
}

interface Index {
  props: Props,
  state: State,
}

class Index extends Component<Props, State> {
  static defaultProps: Props = {}

  constructor(props: Props) {
    super(props);

    this.state = {
      images: [
        { url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg' },
        { url: 'https://storage.360buyimg.com/mtd/home/331543234387025.jpg' },
        { url: 'https://storage.360buyimg.com/mtd/home/221543234387016.jpg' },
      ],
    } as State;
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentWillReact() {}

  [x: string]: any;

  handleUploadSuccess(images: IImage[]) {
    console.log(images);
    this.setState((prevState) => {
      return {
        images: prevState.images.concat(images),
      };
    });
  }

  /**
   * 预览图片
   *
   * @private
   * @param {number} [index=0] 下标序号
   * @memberof Index
   */
  private previewImage(index: number = 0) {
    const { images } = this.state;
    const urls = images.map(image => image.url);
    Taro.previewImage({
      current: index.toString(),
      urls,
    });
  }

  /**
   * 渲染 图片预览图列表
   *
   * @private
   * @returns
   * @memberof Index
   */
  private renderList() {
    const { images } = this.state;
    const list = images.map((image: any, index) => {
      const key = `image-${index}`;
      return (
        <View
          className="image-item"
          key={key}
          onClick={() => {
            this.previewImage(index);
          }}
        >
          <Image mode="aspectFill" src={image.url} />
        </View>
      );
    });

    return list;
  }

  render(): object {
    const list = this.renderList();

    return (
      <View className="image-picker">
        {list}
        <Uploader
          onSuccess={(images: IImage[]) => {
            this.handleUploadSuccess(images);
          }}
        />
      </View>
    );
  }
}

export default Index as ComponentType<Props>;
