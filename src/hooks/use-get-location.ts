import Taro, { useDidShow, useState, usePullDownRefresh } from '@tarojs/taro';
import QQMapWX from '@/utils/qqmap-wx-jssdk';

export default function useGetLocation() {
  const [location, setLocation] = useState('');

  /**
   * 根据经纬度获取所在城市
   *
   * @param {number} latitude 纬度
   * @param {number} longitude 经度
   * @memberof Index
   */
  const translateLocation = (latitude: number, longitude: number) => {
    new QQMapWX({
      key: 'MPUBZ-TQ53D-GG44S-HVPA6-MT2Z3-I5B3X',
    }).reverseGeocoder({
      location: { latitude, longitude },
      sig: 'opsPg9Zewu0HOx09qgjWEx97ZW8a1Fw7', // WebServiceAPI 签名
      success: (res: any) => {
        const { address_component: addressComponent } = res?.result;
        const { city } = addressComponent;
        setLocation(city);
      },
      fail: (err: { status: number; message: string; }) => {
        Taro.showToast({
          icon: 'none',
          title: err.message,
        });
      },
    });
  };

  /**
   * 获取地理信息
   *
   */
  const getLocation = async () => {
    try {
      const res = await Taro.getLocation({
        type: 'wgs84',
        isHighAccuracy: true,
      });
      const { latitude, longitude } = res;
      translateLocation(latitude, longitude);
    } catch (error) {
      console.log('获取失败 =>>', error);
      Taro.showToast({
        title: '请打开手机定位并授权后重试',
        icon: 'none',
        mask: true,
        duration: 2500,
      });

      Taro.hideNavigationBarLoading();
      Taro.stopPullDownRefresh();
    }
  };

  useDidShow(() => {
    getLocation();
  });

  usePullDownRefresh(() => {
    Taro.showNavigationBarLoading();
    getLocation();
  });

  return {
    location,
  };
}
