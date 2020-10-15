import Taro, { FC, useRouter, useShareAppMessage } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { RootState } from '@/store';
import { AccountState, AccountDispatch } from '@/reducers/account/types';
import { gotoPage, PATH_CONFIG } from '@/router';
import { useCheckLogin } from '@/hooks';
import { trackEventHandler } from '@/utils';
import EVENTS_MAP from '@/constants/events';
import './index.scss';


const Index: FC = () => {
  const { isLogged } = useSelector<RootState, AccountState>((state) => state.account);
  const { params } = useRouter();
  const dispatch = useDispatch<AccountDispatch>();

  const handleSendRequest = useCheckLogin(() => {
    console.log('已经登录, 发请求');
    trackEventHandler(EVENTS_MAP['首页-自定义事件'], {
      frame: 'Taro',
      version: '2.12.3',
    });
  });


  useShareAppMessage(() => {});

  return (
    <View className="container">
      <View className="test-content">
        <Text>Home page</Text>
        <View style={{ height: '1000px' }}>xxx</View>
        <View style={{ height: '1000px' }}>
          <Button
            onClick={() => {
              dispatch({
                type: 'SET_ROLE',
                payload: {
                  role: 'TEAM_LEADER',
                },
              });
            }}
          >
            负责人
          </Button>
          <Button
            onClick={() => {
              dispatch({
                type: 'SET_ROLE',
                payload: {
                  role: 'NORMAL',
                },
              });
            }}
          >
            司机
          </Button>
        </View>
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
        <View>bottom</View>
      </View>
    </View>
  );
};


Index.config = {
  navigationBarTitleText: '首页',
};

export default Index;
