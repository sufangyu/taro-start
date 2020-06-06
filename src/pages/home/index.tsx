import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { gotoPage, PATH_CONFIG } from '@/router';
import { IAccountStore } from '@/store/account';
import withLogin from '@/decorators/with-login';
import QQMapWX from '@/utils/qqmap-wx-jssdk';

import './index.scss';

interface Props {
  accountStore?: IAccountStore;
}
interface State {}

interface Index {
  props: Props;
  state: State;
}

@withLogin()
@inject('globalStore', 'accountStore')
@observer
class Index extends Component<Props, State> {
  config: Config = {
    navigationBarTitleText: '首页',
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  // eslint-disable-next-line react/sort-comp
  componentDidShow() {
    this.getLocation();
  }

  componentDidHide() {}

  componentWillReact() {}

  async getLocation() {
    try {
      const res = await Taro.getLocation({
        type: 'wgs84',
        isHighAccuracy: true,
      });
      const { latitude, longitude } = res;
      this.translateLocation(latitude, longitude);
    } catch (error) {
      console.log('获取失败 =>>', error);
    }
  }

  /**
   * 根据经纬度获取所在城市
   *
   * @param {number} latitude 纬度
   * @param {number} longitude 经度
   * @memberof Index
   */
  translateLocation(latitude: number, longitude: number) {
    new QQMapWX({
      key: 'MPUBZ-TQ53D-GG44S-HVPA6-MT2Z3-I5B3X',
    }).reverseGeocoder({
      location: { latitude, longitude },
      sig: 'opsPg9Zewu0HOx09qgjWEx97ZW8a1Fw7', // WebServiceAPI 签名
      success: (res: any) => {
        const { address_component: addressComponent } = res?.result;
        const { city } = addressComponent;
        console.log(city);
      },
      fail: (err: { status: number; message: string; }) => {
        Taro.showToast({
          icon: 'none',
          title: err.message,
        });
      },
    });
  }

  render() {
    const { accountStore } = this.props;

    return (
      <View className="container">
        <View className="test-content">
          <Text>Home page</Text>
          {
            accountStore!.logged === 'NO'
              ? (
                <Button
                  onClick={() => {
                    const { params } = this.$router;
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
  }
}

export default Index as ComponentType<Props>;
