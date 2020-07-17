import Taro, { FC, useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { ImagePreview } from '@/components';
import './index.scss';

const Index: FC = () => {
  const [images] = useState<string[]>([
    'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
    'https://storage.360buyimg.com/mtd/home/331543234387025.jpg',
    'https://storage.360buyimg.com/mtd/home/221543234387016.jpg',
    'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
    'https://storage.360buyimg.com/mtd/home/331543234387025.jpg',
    'https://storage.360buyimg.com/mtd/home/221543234387016.jpg',
  ]);

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
};

export default Index.config = {
  navigationBarTitleText: '图片预览',
};
