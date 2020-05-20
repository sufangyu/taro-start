import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import Uploader from './uploader';
import icRemove from './images/ic-remove.png';

import './index.scss';

interface IImage {
  /**
   * 图片 ID
   *
   * @type {(string | number)}
   * @memberof IImage
   */
  id?: string | number;

  /**
   * 图片地址
   *
   * @type {string}
   * @memberof IImage
   */
  url: string;
}


type Props = {
  /**
   * 初始化图片列表
   */
  list: IImage[];
  /**
   * 限制张数
   */
  limit?: number;
  /**
   * 单次最多可选择的张数
   */
  multiSelect?: number;
  /**
   * 图片更改
   */
  onChange: Function;
}

type State = {
  /**
   * 图片列表
   */
  images: IImage[];
}

interface Index {
  props: Props;
  state: State;
}

class Index extends Component<Props, State> {
  static defaultProps: Props = {
    list: [],
    limit: 9,
    multiSelect: 1,
    onChange: () => {},
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      images: props.list,
    } as State;
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps: any) {
    const { list } = nextProps;
    this.setState({
      images: [...list],
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentWillReact() {}

  [x: string]: any;

  /**
   * 上传成功回调
   *
   * @param {IImage[]} res
   */
  handleUploadSuccess(list: IImage[]) {
    const { images } = this.state;
    const { onChange } = this.props;
    const newImages = images.concat([...list]);

    this.setState({
      images: newImages,
    });

    onChange(newImages);
  }

  /**
   * 预览图片
   *
   * @private
   * @param {number} [index=0] 下标序号
   */
  private previewImage(index: number = 0) {
    const { images } = this.state;
    const urls = images.map(image => image.url);
    Taro.previewImage({
      current: urls[index],
      urls,
    });
  }

  /**
   * 移除图片
   *
   * @private
   * @param {number} index 下标序号
   */
  private handleRemove(index: number) {
    const { images } = this.state;
    const { onChange } = this.props;
    const newImages = images.filter((_item, idx) => idx !== index);
    this.setState({
      images: newImages,
    });

    onChange(newImages);
  }

  /**
   * 渲染 图片预览图列表
   *
   * @private
   * @returns
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
          <Image
            onClick={(e) => {
              e.stopPropagation();
              this.handleRemove(index);
            }}
            className="icon-remove"
            mode="aspectFill"
            src={icRemove}
          />
        </View>
      );
    });

    return list;
  }

  render() {
    const { images } = this.state;
    const { limit, multiSelect } = this.props;
    const list = this.renderList();

    return (
      <View className="image-picker">
        {list}
        {
          images.length < (limit as number)
            ? (
              <Uploader
                multiSelect={multiSelect}
                onSuccess={(res: IImage[]) => {
                  this.handleUploadSuccess(res);
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
