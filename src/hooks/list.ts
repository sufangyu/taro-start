import Taro, {
  useState, useEffect, useReachBottom, usePullDownRefresh, useRef,
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
  /** 列表查询参数 */
  query = {},
  /** 列表请求函数 */ 
  fetch = () => {},
}) {
  const prevPage = useRef(initPage);
  const [loading, setLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [pagination, setPagination] = useState({
    page: initPage,
    size: initSize,
    total: 0, /** 总条目数 */
  });
  const [listQuery, setListQuery] = useState({
    ...query,
    ...pagination,
    limit: pagination.size,
  });
  const [list, setList] = useState([]);

  /**
   * 获取列表数据
   *
   */
  async function getList() {
    if (loading) {
      return;
    }

    const featchQuery = {
      ...listQuery,
    };
    // 删除不必要的参数
    delete featchQuery.size;
    delete featchQuery.total;

    setLoading(true);
    try {
      const res = await fetch(featchQuery);
      const data = res[listKey] || [];
      const listData = isRefresh ? data : list.concat(data);
      setList(listData);
      prevPage.current = pagination.page;
    } catch (err) {
      console.warn(err);
      // 请求失败, 回设页码
      setPagination((prevPagination) => ({
        ...prevPagination,
        page: prevPage.current,
      }));
      prevPage.current = pagination.page;
    } finally {
      setLoading(false);
      setIsRefresh(false);
      Taro.hideNavigationBarLoading();
      Taro.stopPullDownRefresh();
    }
  }

 
  /**
   * 获取指定页码列表数据
   *
   * @param {{ page: number, size: number }} { page = 1, size = initSize }
   */
  function onPageChange({ page = 1, size = initSize }: { page: number; size?: number; }) {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page,
      size,
    }));
    setListQuery((prevQuery) => ({
      ...prevQuery,
      page,
    }));
  }
  

  /**
   * 搜索
   *
   */
  function onSearch() {
    setIsRefresh(true);
    setListQuery((prevQuery) => ({
      ...prevQuery,
      ...query,
      page: initPage,
      size: initSize,
    }));
    setPagination((prevState) => ({
      ...prevState,
      page: initPage,
      size: initSize,
    }));
  }

  /**
   * 获取下一页数据
   *
   */
  function getListNext() {
    const nextPage = pagination.page + 1;
    onPageChange({
      page: nextPage,
    });
  }

  // 加载数据
  useEffect(getList, [listQuery]);
  

  // 上拉加载下一页
  useReachBottom(() => {
    getListNext();
  });

  // 下拉刷新
  usePullDownRefresh(() => {
    if (!enablePullDownRefresh) {
      return;
    }
    
    setIsRefresh(true);
    onPageChange({
      page: initPage,
      size: initSize,
    });
    Taro.showNavigationBarLoading();
  });

  return {
    loading,
    list,
    pagination,
    getList,
    getListNext,
    onSearch,
    onPageChange,
  };
}
