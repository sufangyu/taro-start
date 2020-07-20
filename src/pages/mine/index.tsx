import Taro, { FC } from '@tarojs/taro';
import { useDispatch, useSelector } from '@tarojs/redux';
import { IAccountState } from '@/reducers/account/types';
import { View, Button, Text } from '@tarojs/components';
import { reLaunchLoginPage } from '@/router';
import { DebugEnv } from '@/components';
import './index.scss';


const Index: FC = () => {
  const dispatch = useDispatch();
  const { account }: IAccountState = useSelector((state: any) => state.account);

  const handleLogout = () => {
    dispatch({
      type: 'REMOVE_ACCOUNT',
    });
    // 关闭其他页面, 跳转到欢迎页
    reLaunchLoginPage();
  };

  return (
    <View className="container">
      <View className="test-content">
        <View className="page-title">我的展示页面</View>
        <DebugEnv />
        <Button
          type="primary"
          onClick={handleLogout}
        >
          <Text>退出登录 - { account.name }</Text>
        </Button>
      </View>
    </View>
  );
};

Index.config = {
  navigationBarTitleText: '我的',
};
