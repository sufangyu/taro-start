import Taro, {
  Config, useDidShow, useState, usePullDownRefresh,
} from '@tarojs/taro';
import { View, Map, Button } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import { useGeocoder } from '@/hooks';

import './index.scss';

function Index() {
  const locationAddress = '广州市越秀区中山五路70号捷登都会';
  const { getReverseGeocoder, getGeocoder } = useGeocoder();
  const [currentAddress, setCurrentAddress] = useState('');
  const [addressInfo, setAddressInfo] = useState({
    province: '', city: '', district: '', street: '',
  });
  const [curLocation, setCurLocation] = useState({ lng: 0, lat: 0 });

  /**
   * 获取当前地址信息
   *
   */
  const getCurrentAddressInfo = async () => {
    const { address, address_component: addressComponent } = await getReverseGeocoder();
    setCurrentAddress(address);
    setAddressInfo((prevState) => {
      return { ...prevState, ...addressComponent };
    });
  };

  /**
   * 获取指定地址的经纬度
   *
   */
  const getCurrentLocation = async () => {
    const { location } = await getGeocoder(locationAddress) as any;
    console.log(location);
    setCurLocation((prevState) => {
      return { ...prevState, ...location };
    });
  };

  /**
   * 打开地图
   *
   */
  const openMap = () => {
    Taro.openLocation({
      latitude: Number(curLocation.lat),
      longitude: Number(curLocation.lng),
      name: '海珠湖',
      address: locationAddress,
    });
  };

  useDidShow(async () => {
    getCurrentAddressInfo();
    getCurrentLocation();
  });

  usePullDownRefresh(() => {
    console.log('usePullDownRefresh');
    getCurrentAddressInfo();
    getCurrentLocation();
  });

  return (
    <View className="container">
      <View>地址：{currentAddress}</View>
      <View>
        具体：
        {addressInfo.province}, 
        {addressInfo.city}, 
        {addressInfo.district}, 
        {addressInfo.district}
      </View>

      <View>
        <Button size="mini" onClick={openMap}>打开地图(海珠湖)</Button>
      </View>
      
      <Map
        longitude={curLocation.lng}
        latitude={curLocation.lat}
        markers={
          [
            {
              id: Date.now(),
              iconPath: '',
              alpha: 1,
              latitude: curLocation.lat,
              longitude: curLocation.lng,
              callout: {
                content: locationAddress,
                fontSize: 12,
                color: '#ff0000',
                bgColor: '#ffffff',
                textAlign: 'center',
                padding: 8,
                display: 'ALWAYS',
                borderRadius: 5,
                borderWidth: 0,
                borderColor: '#ffffff',
              },
            },
          ]
        }
      />
    </View>
  );
}

Index.config = {
  navigationBarTitleText: '获取地理位置',
  enablePullDownRefresh: true,
} as Config;

export default observer(Index);
