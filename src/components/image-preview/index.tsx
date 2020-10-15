import Taro, { FC } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';

import './index.scss';

interface Props {
  /** 图片集合 */
  images: string[];
  /** 限制单行显示的图片数量 */
  limit?: number;
  /**
   * 提示文案
   *
   * left: 图片剩余数量; count: 图片总数量; false: 不显示
   */
  tipsText?: 'left' | 'count' | false;
}

const Index: FC<Props> = (props: Props) => {
  const { images = [], limit = 1, tipsText = 'left' } = props;

  /**
   * 预览图片
   *
   */
  const previewImages = (index: number) => {
    Taro.previewImage({
      urls: images,
      current: images[index],
    });
  };


  /**
   * 获取可展示图片集合
   *
   * @returns
   */
  const getImagesVisible = () => {
    return images.filter((_image, index) => {
      return index < limit;
    });
  };

  /**
   * 渲染图片列表
   *
   * @returns
   */
  const renderImageList = () => {
    // 显示的图片
    const imageList = getImagesVisible();
    const listContent = imageList.map((url, index) => {
      const key = `image-key-${index}`;

      // 图片集合提示信息
      let tipsTextContent = '';
      if (tipsText) {
        const count = images.length;
        const left = count - limit;
        tipsTextContent = tipsText === 'left' ? `剩${left}张` : `${count}张`;
      }

      return (
        <View
          className="image-list-item"
          key={key}
          onClick={() => {
            previewImages(index);
          }}
        >
          <Image mode="aspectFill" src={url} />
          {/* 有提示内容 && 当前序号是单行最后一张 */}
          {tipsTextContent && (index === limit - 1) && <Text>{tipsTextContent}</Text>}
        </View>
      );
    });

    return (
      <View>{listContent}</View>
    );
  };

  return (
    <View className="image-list">
      {renderImageList()}
    </View>
  );
};

export default Index;
