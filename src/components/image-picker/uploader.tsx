import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.scss';

/**
 * 选择图片的接口
 *
 * @export
 * @interface IChooseImage
 */
interface IChooseImage {
  /**
   * 返回信息
   */
  errMsg: string;

  /**
   * 文件路径
   */
  tempFilePaths?: string[];

  /**
   * 文件信息
   */
  tempFiles?: object[];
}


type Props = {
  /**
   * 单次最多可选择的张数
   */
  multiSelect?: number;
  [propName: string]: any;
}

type State = {}

interface Index {
  props: Props;
  state: State;
}

class Index extends Component<Props, State> {
  static defaultProps: Props = {
    multiSelect: 1,
  }

  constructor(props: Props) {
    super(props);

    this.state = {} as State;
  }

  /**
   * 选择图片
   *
   * @returns
   * @memberof Index
   */
  async handleChooseImage() {
    const { multiSelect, onSuccess } = this.props;
    const { errMsg, tempFilePaths = [] }: IChooseImage = await Taro.chooseImage({
      count: multiSelect,
    });

    if (errMsg.includes('fail')) {
      return;
    }

    const images: Record<string, any>[] = [];
    let uploadCount: number = 0;
    // 模拟实现批量上传
    (tempFilePaths || []).forEach(async (image) => {
      // @TODO: 具体对接图片上传 api
      images.push({ url: image });
      uploadCount += 1;

      // 处理批量上传完成
      if (uploadCount >= tempFilePaths.length) {
        onSuccess(images);
      }
    });
  }

  [x: string]: any;

  render(): object {
    return (
      <View
        className="image-uploader"
        onClick={() => {
          this.handleChooseImage();
        }}
      />
    );
  }
}

export default Index as ComponentType<Props>;
