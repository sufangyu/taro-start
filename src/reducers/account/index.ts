import Taro from '@tarojs/taro';
import StoreKey from '@/constants/store-key';
import {
  SET_ACCOUNT, REMOVE_ACCOUNT, SET_ROLE,
  IAccountState, AccountActionTypes,
} from './types';


const INITIAL_STATE: IAccountState = {
  account: Taro.getStorageSync(StoreKey.ACCOUNT_KEY) || null,
  isLogged: Taro.getStorageSync(StoreKey.LOGGED_KEY) || 'NO',
  role: Taro.getStorageSync(StoreKey.ROLE_KEY) || '',
};


/**
 * 帐号 Reducer
 *
 * @export
 * @param {*} [state=INITIAL_STATE] 默认值
 * @param {(SetAccountAction | any)} action
 * @returns
 */
export default function accountReducer(
  state: IAccountState = INITIAL_STATE,
  action: AccountActionTypes,
): IAccountState {
  switch (action.type) {
    case SET_ACCOUNT: {
      const { account } = action.payload;
      Taro.setStorage({ key: StoreKey.ACCOUNT_KEY, data: account });
      Taro.setStorage({ key: StoreKey.LOGGED_KEY, data: 'YES' });

      return {
        ...state,
        account,
        isLogged: 'YES',
      };
    }

    case REMOVE_ACCOUNT: {
      Taro.removeStorage({ key: StoreKey.ACCOUNT_KEY });
      Taro.removeStorage({ key: StoreKey.LOGGED_KEY });
      return {
        ...state,
        account: {},
        isLogged: 'NO',
      };
    }

    case SET_ROLE: {
      const { role } = action.payload;
      Taro.setStorage({ key: StoreKey.ROLE_KEY, data: role });

      return {
        ...state,
        role,
      };
    }

    default:
      return state;
  }
}
