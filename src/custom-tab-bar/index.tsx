import Taro, { SFC } from '@tarojs/taro';
import { useDispatch, useSelector } from '@tarojs/redux';
import { RootState } from '@/store';
import { AccountState } from '@/reducers/account/types';
import { TabbarState, TabbarDispatch } from '@/reducers/tabbar/types';
import { CoverView, CoverImage } from '@tarojs/components';
import './index.scss';

interface TabbarItem {
  /** 页面路径 */
  pagePath: string;
  /** 文字描述 */
  text: string;
  /** 默认 icon 图标 */
  iconPath: string;
  /** 选中 icon 图标 */
  selectedIconPath: string;
  /** 信息展示类型 */
  type?: 'badge' | 'dot';
  /** 徽章文案 */
  badgeText?: string;
}

const TEAM_LEADER_TABBAR: TabbarItem[] = [
  {
    pagePath: '/pages/home/index',
    text: '首页',
    iconPath: '../assets/images/tabbar/home.png',
    selectedIconPath: '../assets/images/tabbar/home-selected.png',
  },
  {
    pagePath: '/pages/started/menus/index',
    text: '入门',
    iconPath: '../assets/images/tabbar/started.png',
    selectedIconPath: '../assets/images/tabbar/started-selected.png',
    type: 'badge',
    badgeText: '30',
  },
  {
    pagePath: '/pages/mine/index',
    text: '我的',
    iconPath: '../assets/images/tabbar/mine.png',
    selectedIconPath: '../assets/images/tabbar/mine-selected.png',
    type: 'dot',
  },
];

const NORMAL_TABBAR: TabbarItem[] = [
  {
    pagePath: '/pages/home/index',
    text: '首页',
    iconPath: '../assets/images/tabbar/home.png',
    selectedIconPath: '../assets/images/tabbar/home-selected.png',
  },
  {
    pagePath: '/pages/mine/index',
    text: '我的',
    iconPath: '../assets/images/tabbar/mine.png',
    selectedIconPath: '../assets/images/tabbar/mine-selected.png',
    type: 'dot',
  },
];


const CustomTabBar: SFC = () => {
  const dispatch = useDispatch<TabbarDispatch>();
  const { selected } = useSelector<RootState, TabbarState>((state) => state.tabbar);
  const { role } = useSelector<RootState, AccountState>((state) => state.account);
  const TABBAR_MAPS = {
    TEAM_LEADER: TEAM_LEADER_TABBAR,
    NORMAL: NORMAL_TABBAR,
  };
  const list = TABBAR_MAPS[role || 'NORMAL'];

  const switchTab = (item: any, index: number) => {
    dispatch({
      type: 'SET_SELECTED',
      payload: {
        selected: index,
      },
    });

    const url = item.pagePath;
    Taro.switchTab({ url });
  };

  return (
    <CoverView className="tabbar">
      <CoverView className="tabbar-border" />
      {list.map((item, index) => {
        const isSelected = selected === index;
        return (
          <CoverView
            className="tabbar-item"
            onClick={() => switchTab(item, index)}
            data-path={item.pagePath}
            key={item.text}
          >
            <CoverImage src={isSelected ? item.selectedIconPath : item.iconPath} />
            <CoverView
              style={{
                color: isSelected ? 'rgba(0, 162, 0, 1)' : 'rgba(0, 0, 0, 0.6)',
              }}
            >
              {item.text}
            </CoverView>
            {
              item.type && ['badge', 'dot'].includes(item.type)
              && <CoverView className={item.type}>{ item.type === 'badge' ? item.badgeText : '' }</CoverView>
            }
          </CoverView>
        );
      })}
    </CoverView>
  );
};

export default CustomTabBar;
