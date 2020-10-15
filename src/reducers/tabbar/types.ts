export const SET_SELECTED = 'SET_SELECTED';
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';

export interface ITabbarState {
  /** 选中高亮的序号 */
  selected: number;
}

export interface SetTabbarAction {
  type: typeof SET_SELECTED;
  payload: {
    selected: number;
  };
}

export type TabbarActionTypes = SetTabbarAction;

export type TabbarDispatch = (args: TabbarActionTypes) => void;
