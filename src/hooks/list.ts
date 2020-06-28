// import Taro, { useState } from '@tarojs/taro';

// async function asyncVessel(promise) {
//   return promise.then(res => [res, null]).catch(err => [null, err])
// }

import { useState, useEffect } from '@tarojs/taro';

export default function useList({
  initList = [] as any[],
  initQuery = {
    page: 1,
    limit: 10,
  },
  fetch = (): any => {},
  /** 列表取值 key */
  listKey = 'data',
}) {
  /** 是否加载中 */
  const [loading, setLoading] = useState(false);

  /** 列表内容 */
  const [list, setList] = useState(initList);

  /** 获取列表 */
  const getList = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(initQuery);
      setList([
        ...initList,
        ...res[listKey],
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, [getList]);

  return {
    list,
  };
}
