import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';

import './index.scss';

type Props = {
  /**
   * 图片集合
   *
   * @type {string[]}
   */
  images: string[];

  /**
   * 单行的图片数量
   *
   * @type {number}
   */
  length?: number;

  /**
   * 提示文案
   *
   * left: 图片剩余数量; count: 图片总数量; false: 不显示
   *
   * @type {('left' | 'count' | false)}
   */
  tipsText?: 'left' | 'count' | false;

  /**
   * 自定义类名
   *
   * @type {string}
   */
  className?: string;

  [propName: string]: any;
}

type State = {}

interface Index {
  props: Props;
  state: State;
}

class Index extends Component<Props, State> {
  static defaultProps: Props = {
    images: [],
    length: 1,
    tipsText: 'left',
    className: '',
  }

  constructor(props: Props) {
    super(props);

    this.state = {} as State;
  }

  /**
   * 显示的图片
   * 
   */
  private getImagesPreview() {
    const { images, length } = this.props;

    const imageList = [];
    images.forEach((image, index) => {
      if (index < length) {
        imageList.push(image);
      }
    });

    return imageList;
  }

  /**
   * 预览图片
   * 
   */
  private previewImages(index: number) {
    const { images } = this.props;
    Taro.previewImage({
      urls: images,
      current: images[index],
    });
  }

  /**
   * 渲染提示语
   * 
   */
  renderTipsText(index) {
    const { images, length, tipsText } = this.props;

    // 不显示提示语
    if (!tipsText) {
      return null;
    }

    // 一行显示图片的序号不等于当前序号, 则不显示提示语
    if (length - 1 !== index) {
      return null;
    }

    // 显示图片提示
    let tipsTextContent = '';
    if (tipsText) {
      const count = images.length;
      const left = count - length;
      tipsTextContent = tipsText === 'left' ? `剩${left}张` : `${count}张`;
    }

    return <Text>{tipsTextContent}</Text>;
  }

  /**
   * 渲染图片列表
   * 
   */
  renderImageList() {
    // 显示的图片
    const imageList = this.getImagesPreview();

    const imagesContent = imageList.map((url, index) => {
      const key = `image-key-${index}`;
      const tipsTextContent = this.renderTipsText(index);
      return (
        <View
          className="image-list-item"
          key={key}
          onClick={() => {
            this.previewImages(index);
          }}
        >
          <Image mode="aspectFill" src={url} />
          {tipsTextContent}
        </View>
      );
    });

    return imagesContent;
  }

  render(): object {
    const imagesContent = this.renderImageList();

    return (
      <View className="image-list">
        {imagesContent}
      </View>
    );
  }
}

export default Index as ComponentType<Props>;
