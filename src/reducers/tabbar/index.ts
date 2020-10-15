import {
  SET_SELECTED,
  TabbarState, TabbarActionTypes,
} from './types';


const INITIAL_STATE: TabbarState = {
  selected: 0,
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
  state = INITIAL_STATE,
  action: TabbarActionTypes,
) {
  switch (action.type) {
    case SET_SELECTED: {
      const { selected } = action.payload;

      return {
        ...state,
        selected,
      };
    }

    default:
      return state;
  }
}
