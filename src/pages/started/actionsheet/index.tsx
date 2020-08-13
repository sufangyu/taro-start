import Taro, { FC, useState } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { Actionsheet, ActionsheetItem } from '@/components';
import './index.scss';


const Index: FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isOpenedWithTitle, setIsOpenedWithTitle] = useState(false);

  const handleClick = (msg: string) => {
    Taro.showToast({
      icon: 'none',
      title: msg,
    });
  };

  return (
    <View className="container">
      <Button
        onClick={() => {
          setIsOpened(true);
        }}
      >
        打开ActionSheet
      </Button>

      <Button
        onClick={() => {
          setIsOpenedWithTitle(true);
        }}
      >
        打开ActionSheet(带标题) {isOpenedWithTitle}
      </Button>

      <Actionsheet
        isOpened={isOpened}
        onClose={() => {
          setIsOpened(false);
        }}
      >
        <ActionsheetItem onClick={() => { setIsOpened(false); handleClick('点了选项一'); }}>选项一</ActionsheetItem>
        <ActionsheetItem onClick={() => { setIsOpened(false); handleClick('点了选项二'); }}>选项二</ActionsheetItem>
      </Actionsheet>

      <Actionsheet
        title="清除位置信息后， 别人将不能查看到你"
        isOpened={isOpenedWithTitle}
        onClose={() => {
          setIsOpenedWithTitle(false);
        }}
      >
        <ActionsheetItem onClick={() => { setIsOpenedWithTitle(false); handleClick('点了选项一'); }}>选项一</ActionsheetItem>
        <ActionsheetItem onClick={() => { setIsOpenedWithTitle(false); handleClick('点了选项二'); }}>选项二</ActionsheetItem>
        <ActionsheetItem onClick={() => { setIsOpenedWithTitle(false); handleClick('点了清除位置信息并退出'); }}>
          <View
            style={{
              color: '#ff4949',
            }}
          >
            清除位置信息并退出
          </View>
        </ActionsheetItem>
      </Actionsheet>
    </View>
  );
};

Index.config = {
  navigationBarTitleText: '',
};
