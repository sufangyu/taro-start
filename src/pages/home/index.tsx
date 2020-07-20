import Taro, { FC, useRouter } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { useSelector } from '@tarojs/redux';
import { IAccountState } from '@/reducers/account/types';
import { gotoPage, PATH_CONFIG } from '@/router';
import { useCheckLogin } from '@/hooks';

import './index.scss';


const Index: FC = () => {
  const { isLogged }: IAccountState = useSelector((state: any) => state.account);
  const { params } = useRouter();

  const handleSendRequest = useCheckLogin(() => {
    console.log('已经登录, 发请求');
  });

  return (
    <View className="container">
      <View className="test-content">
        <Text>Home page</Text>
        <Button onClick={handleSendRequest}>模拟发请求(需登录)</Button>
        {
          isLogged === 'NO'
            ? (
              <Button
                onClick={() => {
                  gotoPage({
                    url: PATH_CONFIG.account.login,
                    query: params,
                    mode: 'replace',
                  });
                }}
              >
                立即登录
              </Button>
            )
            : null
        }
      </View>
    </View>
  );
};

Index.config = {
  navigationBarTitleText: '首页',
};
