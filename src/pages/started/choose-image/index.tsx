import Taro, { FC, useState, useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { ImagePicker } from '@/components';
import './index.scss';

const Index: FC = () => {
  const [images, setImages] = useState<{url: string;}[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setImages(() => [
        { url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg' },
        { url: 'https://storage.360buyimg.com/mtd/home/331543234387025.jpg' },
        // { url: 'https://storage.360buyimg.com/mtd/home/221543234387016.jpg' },
      ]);
    }, 500);
  }, []);

  return (
    <View className="container">
      <ImagePicker
        list={images}
        multiSelect={2}
        onChange={(list: any) => {
          console.log(list);
        }}
      />
    </View>
  );
};

Index.config = {
  navigationBarTitleText: '图片上传',
};
