import Taro, { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.scss';

/**
 * 选择图片的接口
 *
 * @export
 * @interface ChooseImage
 */
interface ChooseImage {
  /** 返回信息 */
  errMsg: string;
  /** 文件路径 */
  tempFilePaths?: string[];
  /** 文件信息 */
  tempFiles?: object[];
}

interface Props {
  /** 单次最多可选择张数 */
  multiSelect?: number;
  /** 图片选择成功回调函数 */
  onSuccess: Function;
}

const Index: FC<Props> = (props: Props) => {
  const { multiSelect = 1, onSuccess = () => {} } = props;

  /**
   * 选择图片
   *
   * @returns
   * @memberof Index
   */
  const handleChooseImage = async () => {
    const { errMsg, tempFilePaths = [] }: ChooseImage = await Taro.chooseImage({
      count: multiSelect,
    });

    if (errMsg.includes('fail')) {
      return;
    }

    const images: Record<string, any>[] = [];
    let uploadCount: number = 0;
    // 模拟实现批量上传
    (tempFilePaths || []).forEach(async (image) => {
      // TODO: 具体对接图片上传 api
      images.push({ url: image });
      uploadCount += 1;

      if (uploadCount >= tempFilePaths.length) {
        onSuccess(images);
      }
    });
  };

  return (
    <View
      className="image-uploader"
      onClick={() => {
        handleChooseImage();
      }}
    />
  );
};

export default Index;
