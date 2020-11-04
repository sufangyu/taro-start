import Taro, {
  useState, useEffect, useReachBottom, usePullDownRefresh,
} from '@tarojs/taro';

interface UseList{
  /** 初始化页码 */
  initPage?: number;
  /** 每页显示条目个数 */
  initSize?: number;
  /** 列表数据 key 名称 */
  listKey?: string;
  /** 是否开启下拉刷新 */
  enablePullDownRefresh?: boolean;
  /** 列表查询参数 */
  query?: object;
  /** 列表请求函数 */
  fetch?: Function;
}

export default function useList<D>({
  initPage = 1,
  initSize = 10,
  listKey = 'list',
  enablePullDownRefresh = true,
  query = {},
  fetch = () => {},
}: UseList) {
  const [loading, setLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isLasted, setIsLasted] = useState(false);
  const [pagination, setPagination] = useState({
    page: initPage,
    size: initSize,
    total: 0, /** 总条目数 */
  });
  const [listQuery, setListQuery] = useState({
    ...query,
    ...pagination,
  });
  const [list, setList] = useState<D[]>([]);


  /**
   * 获取列表数据
   *
   */
  async function getList() {
    if (loading || isLasted) {
      return;
    }

    const fetchQuery = {
      ...listQuery,
    };
    // 删除不必要的参数
    // @ts-ignore
    delete fetchQuery.total;

    setLoading(true);
    try {
      const { data } = await fetch(fetchQuery);
      const curData = data[listKey] || [];
      const listData = isRefresh ? curData : list.concat(curData);
      setList(listData);
      setPagination((prevPagination) => ({
        ...prevPagination,
        total: data?.total || 0,
      }));

      // 判断是否是最后一页
      const { page, pages } = data;
      setIsLasted(page >= pages);
    } catch (err) {
      // 请求失败, 回设页码
      setPagination((prevPagination) => ({
        ...prevPagination,
        page: prevPagination.page - 1,
      }));
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
   * @param {*} [nextQuery={}] 下一次的查询条件
   * @param {boolean} [isRemovePrevQuery=false] 是否移除初始化搜索条件
   */
  function onSearch(nextQuery: any = {}, isRemovePrevQuery: boolean = false) {
    setIsLasted(false);
    setIsRefresh(true);
    setListQuery((prevQuery) => {
      const prevQueryResult = isRemovePrevQuery ? {} : prevQuery;
      return {
        ...prevQueryResult,
        ...nextQuery,
        page: initPage,
        size: initSize,
      };
    });
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
    if (loading || isLasted) {
      return;
    }

    const nextPage = pagination.page + 1;
    onPageChange({
      page: nextPage,
    });
  }

  // 加载数据
  useEffect(() => {
    getList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listQuery, fetch]);


  // 上拉加载下一页
  useReachBottom(() => {
    getListNext();
  });


  // 下拉刷新
  usePullDownRefresh(() => {
    if (!enablePullDownRefresh) {
      return;
    }

    // setList([]);
    setIsRefresh(true);
    setIsLasted(false);
    onPageChange({
      page: initPage,
      size: initSize,
    });
    Taro.showNavigationBarLoading();
  });

  return {
    loading,
    isLasted,
    list,
    pagination,
    getList,
    getListNext,
    onSearch,
    onPageChange,
  };
}
