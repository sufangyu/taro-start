import Taro from '@tarojs/taro';
import { observable } from 'mobx';
import { ACCOUNT_KEY } from '@/constants/store-key';

const store = observable({
  account: Taro.getStorageSync(ACCOUNT_KEY) || null,
});

export default store;
