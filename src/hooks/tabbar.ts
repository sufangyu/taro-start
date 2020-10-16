import { useScope, useDidShow, useRouter } from '@tarojs/taro';
import { useDispatch } from '@tarojs/redux';
import { TabbarDispatch } from '@/reducers/tabbar/types';

function useTabbar() {
  const dispatch = useDispatch<TabbarDispatch>();
  const scope = useScope();
  const { path } = useRouter();

  const setTabbarSelected = () => {
    if (typeof scope.getTabBar === 'function' && scope.getTabBar()) {
      const { state } = scope.getTabBar().$component;
      const tabbarList = state.list || [];
      const selectedIndex = tabbarList.findIndex((item) => item.pagePath === path);
      dispatch({
        type: 'SET_SELECTED',
        payload: {
          selected: selectedIndex,
        },
      });
    }
  };

  useDidShow(() => {
    setTabbarSelected();
  });
}

export default useTabbar;
