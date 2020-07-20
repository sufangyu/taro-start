export const SET_ENV = 'SET_ENV';
export const RESET_ENV = 'RESET_ENV';

export interface DebugState {
  /** 环境标识 */
  envCode: string;
}


export interface SetEnvAction {
  type: typeof SET_ENV;
  payload: {
    envCode: string;
  };
}

export interface RemoveEnvAction {
  type: typeof RESET_ENV;
  payload: {
    envCode: string;
  };
}

export type EnvActionTypes = SetEnvAction | RemoveEnvAction;

export type EnvDispatch = (args: EnvActionTypes) => void;
