import Taro, {
  useState, useEffect, useReachBottom, usePullDownRefresh,
} from '@tarojs/taro';

export default function useList({
  /** 初始化页码 */
  initPage = 1,
  /** 每页显示条目个数 */
  initSize = 5,
  /** 列表数据 key 名称 */
  listKey = 'data',
  /** 是否开启下拉刷新 */
  enablePullDownRefresh = true,
  /** 列表请求函数 */ 
  fetch = () => {},
}) {
  const [loading, setLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [pagination, setPagination] = useState({
    page: initPage,
    size: initSize,
    total: 0, /** 总条目数 */
  });
  const [list, setList] = useState([]);

  /**
   * 获取列表数据
   *
   */
  async function getList() {
    console.log(loading, isRefresh, pagination);
    if (loading) {
      return;
    }

    const { page, size } = pagination;
    const query = {
      page,
      limit: size,
    };
    setLoading(true);
    try {
      const res = await fetch(query);
      const data = res[listKey] || [];
      const listData = isRefresh ? data : list.concat(data);
      setList(listData);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
      setIsRefresh(false);
      Taro.hideNavigationBarLoading();
      Taro.stopPullDownRefresh();
    }
  }

  /**
   * 获取下一页列表数据
   *
   */
  function getListNext() {
    const nextPage = pagination.page + 1;
    setPagination((prevState) => ({
      ...prevState,
      page: nextPage,
    }));
  }

  // 加载数据
  useEffect(getList, [pagination.page, pagination.size]);

  // 上拉加载下一页
  useReachBottom(() => {
    getListNext();
  });

  // 下拉刷新
  usePullDownRefresh(() => {
    if (!enablePullDownRefresh) {
      return;
    }

    Taro.showNavigationBarLoading();
    setIsRefresh(true);
    setPagination((prevState) => ({
      ...prevState,
      page: initPage,
    }));

    // 主动触发. 避免 Effect isRefresh 多次加载
    getList();
  });

  return {
    loading,
    list,
    getList,
    getListNext,
    pagination,
  };
}
