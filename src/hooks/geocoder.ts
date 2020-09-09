import Taro, { useState } from '@tarojs/taro';
import QQMapWX from '@/utils/qqmap-wx-jssdk';
import getWxSetting from '@/utils/auth';

const QQ_MAP_WX_CONFIG = {
  key: 'MPUBZ-TQ53D-GG44S-HVPA6-MT2Z3-I5B3X', // key
  sign: 'opsPg9Zewu0HOx09qgjWEx97ZW8a1Fw7', // WebServiceAPI 签名
};


/**
 * 地址信息转换
 *
 * @export
 * @returns
 */
export default function useGeocoder() {
  const [getting, setGetting] = useState(false);

  /**
   * 根据经纬度获取所在城市
   *
   * @param {number} latitude 纬度
   * @param {number} longitude 经度
   * @memberof Index
   */
  const reverseGeocoder = (latitude: number, longitude: number) => {
    return new Promise((resolve, reject) => {
      new QQMapWX({ key: QQ_MAP_WX_CONFIG.key }).reverseGeocoder({
        location: { latitude, longitude },
        sig: QQ_MAP_WX_CONFIG.sign,
        success: (res: any) => {
          resolve(res?.result);
        },
        fail: (err: { status: number; message: string; }) => {
          Taro.showToast({
            icon: 'none',
            title: err.message,
          });
          reject(err);
        },
        complete: () => {
          Taro.hideLoading();
          setGetting(false);
        },
      });
    });
  };

  /**
   * 经纬度转地理信息
   *
   */
  const getReverseGeocoder = async () => {
    if (getting) {
      return false;
    }

    Taro.showLoading({
      title: '正在定位',
    });

    try {
      const { isAuth } = await getWxSetting('userLocation');
      if (!isAuth) {
        return false;
      }
      setGetting(true);
      const res = await Taro.getLocation({
        type: 'wgs84',
        isHighAccuracy: true,
      });
      const { latitude, longitude } = res;
      return reverseGeocoder(latitude, longitude);
    } catch (error) {
      console.log('获取失败 =>>', error);
      Taro.showToast({
        title: '请打开手机定位并授权后重试',
        icon: 'none',
        mask: true,
      });

      setGetting(false);
      return error;
    }
  };

  /**
   * 地理信息转经纬度
   *
   * @param {string} [address=''] 地址
   * @returns
   */
  const getGeocoder = async (address = '') => {
    return new Promise((resolve, reject) => {
      new QQMapWX({ key: QQ_MAP_WX_CONFIG.key }).geocoder({
        address,
        sig: QQ_MAP_WX_CONFIG.sign,
        success: (res: any) => {
          resolve(res?.result);
        },
        fail: (err: { status: number; message: string; }) => {
          Taro.showToast({
            icon: 'none',
            title: err.message,
          });
          reject(err);
        },
        complete: () => {
          setGetting(false);
          Taro.hideLoading();
        },
      });
    });
  };

  return {
    getting,
    getReverseGeocoder,
    getGeocoder,
  };
}
