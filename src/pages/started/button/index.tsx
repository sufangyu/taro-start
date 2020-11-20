import Taro, { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { MsButton } from '@/components';
import './index.scss';


const Index: FC = () => {
  return (
    <View className="container">
      <View className="button-group">
        <View className="title">功能按钮</View>
        <View>
          <MsButton
            block
            openType="getUserInfo"
            onGetUserInfo={(e) => {
              console.log(e);
            }}
          >
            获取用户信息
          </MsButton>
        </View>
        <View>
          <MsButton
            block
            openType="getPhoneNumber"
            onGetPhoneNumber={(e) => {
              console.log(e);
            }}
          >
            获取手机号
          </MsButton>
        </View>
      </View>


      <View className="button-group">
        <View className="title">基础用法</View>
        <View>
          <MsButton>默认</MsButton>
          <MsButton type="primary">主要</MsButton>
          <MsButton type="seconde">次要</MsButton>
        </View>

        <View>
          <MsButton plain>默认</MsButton>
          <MsButton plain type="primary">主要</MsButton>
          <MsButton plain type="seconde">次要</MsButton>
        </View>
      </View>


      <View className="button-group">
        <View className="title">圆角按钮</View>
        <View>
          <MsButton round>默认</MsButton>
          <MsButton round type="primary">主要</MsButton>
          <MsButton round type="seconde">次要</MsButton>
        </View>
      </View>

      <View className="button-group">
        <View className="title">禁用状态</View>
        <View>
          <MsButton disabled round>默认</MsButton>
          <MsButton disabled round type="primary">主要</MsButton>
          <MsButton disabled round type="seconde">次要</MsButton>
        </View>
      </View>

      <View className="button-group">
        <View className="title">不同尺寸</View>
        <View>
          <MsButton>默认</MsButton>
          <MsButton size="medium">中等</MsButton>
          <MsButton size="small">小型</MsButton>
          <MsButton size="mini">超小</MsButton>
        </View>
        <View>
          <MsButton round>默认</MsButton>
          <MsButton round size="medium">中等</MsButton>
          <MsButton round size="small">小型</MsButton>
          <MsButton round size="mini">超小</MsButton>
        </View>
      </View>

    </View>
  );
};

Index.config = {
  navigationBarTitleText: '按钮',
};
