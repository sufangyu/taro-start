import Taro, { FC, useState, useEffect } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import Uploader from './uploader';
import icRemove from './images/ic-remove.png';

import './index.scss';

interface IImage {
  id?: string;
  url: string;
}

interface Props {
  /** 初始化图片列表 */
  list: IImage[];
  /** 限制总张数 */
  limit?: number;
  /** 单次最多可选择张数 */
  multiSelect?: number;
  /** 图片选择成功回调函数 */
  onChange: Function;
}


const Index: FC<Props> = (props: Props) => {
  const {
    list = [],
    limit = 9,
    multiSelect = 1,
    onChange = () => {},
  } = props;

  const [images, setImages] = useState(list);

  useEffect(() => {
    setImages(list);
  }, [list]);

  
  /**
   * 预览图片
   *
   * @param {number} [index=0] 当前图片下标
   */
  const previewImage = (index: number = 0) => {
    const urls = images.map(image => image.url);
    Taro.previewImage({
      current: urls[index],
      urls,
    });
  };

  /**
   * 移除图片
   *
   * @param {number} index 当前图片下标
   */
  const handleRemove = (index: number) => {
    const newImages = images.filter((_item, idx) => idx !== index);
    setImages(() => newImages);
    onChange(newImages);
  };

  /**
   * 上传成功回调
   *
   * @param {IImage[]} res
   */
  const handleUploadSuccess = (res: IImage[]) => {
    const newImages = images.concat([...res]);
    setImages(() => newImages);
    onChange(newImages);
  };

  
  /**
   * 渲染 图片预览图列表
   *
   * @returns
   */
  const renderList = () => {
    const listContent = images.map((image: IImage, index) => {
      const key = `image-${index}`;

      return (
        <View
          className="image-item"
          key={key}
          onClick={() => {
            previewImage(index);
          }}
        >
          <Image mode="aspectFill" src={image.url} />
          <Image
            onClick={(e) => {
              e.stopPropagation();
              handleRemove(index);
            }}
            className="icon-remove"
            mode="aspectFill"
            src={icRemove}
          />
        </View>
      );
    });

    return listContent;
  };

  const listContent = renderList();

  return (
    <View className="image-picker">
      {listContent}
      {
        images.length < limit
          ? (
            <Uploader
              multiSelect={multiSelect}
              onSuccess={(res: IImage[]) => {
                handleUploadSuccess(res);
              }}
            />
          )
          : null
      }
    </View>
  );
};

export default Index;
