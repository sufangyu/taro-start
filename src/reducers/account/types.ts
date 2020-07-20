export const SET_ACCOUNT = 'SET_ACCOUNT';
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';

export type TIsLogged = 'YES' | 'NO';

export interface IAccount {
  /** 用户 ID */
  id?: string;
  /** 用户名 */
  name?: string;
  [propName: string]: any;
}

export interface IAccountState {
  /** 账户信息 */
  account: IAccount;
  /** 是否登录 */
  isLogged: TIsLogged;
}

export interface SetAccountAction {
  type: typeof SET_ACCOUNT;
  payload: {
    account: IAccount;
    isLogged: TIsLogged;
  };
}

export interface RemoveAccountAction {
  type: typeof REMOVE_ACCOUNT;
}

export type AccountActionTypes = SetAccountAction | RemoveAccountAction;

export type AccountDispatch = (args: AccountActionTypes) => void;
