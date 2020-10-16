import Taro, { FC } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { useDispatch, useSelector } from '@tarojs/redux';
import { RootState } from '@/store';
import { AccountState } from '@/reducers/account/types';
import { useTabbar } from '@/hooks';
import { reLaunchLoginPage } from '@/router';
import { DebugEnv } from '@/components';
import './index.scss';


const Index: FC = () => {
  useTabbar();
  const dispatch = useDispatch();
  const { account }: AccountState = useSelector<RootState, AccountState>((state) => state.account);

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
