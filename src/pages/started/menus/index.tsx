import { FC, useState } from '@tarojs/taro';
import { ScrollView, View } from '@tarojs/components';
import { gotoPage, PATH_CONFIG } from '@/router';
import './index.scss';

type Page = {
  /** 名称 */
  label?: string;
  /** 路径 */
  path: string;
}

const Index: FC = () => {
  const [menus] = useState<Page[]>([
    { label: 'State & Props', path: PATH_CONFIG.started.stateProps },
    { label: '按钮', path: PATH_CONFIG.started.button },
    { label: '事件处理', path: PATH_CONFIG.started.event },
    { label: '网络请求', path: PATH_CONFIG.started.request },
    { label: '页面跳转', path: PATH_CONFIG.started.navigation },
    { label: '下拉刷新', path: PATH_CONFIG.started.pullDownRefresh },
    { label: '图片上传', path: PATH_CONFIG.started.chooseImage },
    { label: '图片展示', path: PATH_CONFIG.started.previewImage },
    { label: '表单校验', path: PATH_CONFIG.started.formValidate },
    { label: '获取地理信息', path: PATH_CONFIG.started.location },
    { label: '列表', path: PATH_CONFIG.started.list },
    { label: '结果展示', path: PATH_CONFIG.started.result },
    { label: 'ActionSheet', path: PATH_CONFIG.started.actionsheet },
    { label: 'Event Bus', path: PATH_CONFIG.started.eventsList },
    { label: '数据格式化', path: PATH_CONFIG.started.format },
    { label: '分包示例', path: PATH_CONFIG.started.subPages },
  ]);

  /**
   * 页面跳转
   *
   * @param {Page} page
   */
  const handleGotoPage = (page: Page) => {
    gotoPage({
      url: page.path,
    });
  };

  return (
    <ScrollView
      className="container"
      scrollY
    >
      <View className="page-title">入门教程</View>
      <View className="menu">
        {
          menus.map(item => {
            return (
              <View
                className="menu-item"
                key={item.path}
                onClick={() => handleGotoPage(item)}
              >
                {item.label}
              </View>
            );
          })
        }
      </View>
    </ScrollView>
  );
};

Index.config = {
  navigationBarTitleText: '入门',
};
