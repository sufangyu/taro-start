export const SET_ACCOUNT = 'SET_ACCOUNT';
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';
export const SET_ROLE = 'SET_ROLE';

export type IsLogged = 'YES' | 'NO';

export interface IAccount {
  /** 用户 ID */
  id?: string;
  /** 用户名 */
  name?: string;
  [propName: string]: any;
}

export interface AccountState {
  /** 账户信息 */
  account: IAccount;
  /** 是否登录 */
  isLogged: IsLogged;
  /** 角色 */
  role: string;
}

export interface SetAccountAction {
  type: typeof SET_ACCOUNT;
  payload: {
    account: IAccount;
    isLogged: IsLogged;
  };
}

export interface RemoveAccountAction {
  type: typeof REMOVE_ACCOUNT;
}

export interface SetRoleAction {
  type: typeof SET_ROLE;
  payload: {
    role: string;
  };
}

export type AccountActionTypes = SetAccountAction | RemoveAccountAction | SetRoleAction;

export type AccountDispatch = (args: AccountActionTypes) => void;
