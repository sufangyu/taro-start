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
   *
   * @type {string}
   * @memberof IChooseImage
   */
  errMsg: string;

  /**
   * 文件路径
   *
   * @type {string[]}
   * @memberof IChooseImage
   */
  tempFilePaths?: string[];

  /**
   * 文件信息
   *
   * @type {object[]}
   * @memberof IChooseImage
   */
  tempFiles?: object[];
}

interface ITempFile {
  path: string;
  url?: string;
  size: number;
}


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

  async handleChooseImage() {
    const { onSuccess } = this.props;
    const { errMsg, tempFiles } = await Taro.chooseImage() as IChooseImage;
    if (errMsg === 'chooseImage:ok') {
      const images = tempFiles!.map((file: ITempFile) => {
        file.url = file.path;
        return file;
      });

      onSuccess(images);
    }
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
