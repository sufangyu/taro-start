/**
 * 格式化时间
 *
 * @export
 * @param {*} [date=new Date()] 时间
 * @param {string} [fmt='yyyy-MM-dd HH:mm:ss'] 格式
 * @returns
 */
export function parseTime(
  date: Date | string | number = new Date(),
  fmt = 'yyyy-MM-dd HH:mm:ss',
) {
  // eslint-disable-next-line no-param-reassign
  date = new Date(date);
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };

  if (/(y+)/.test(fmt)) {
    // eslint-disable-next-line no-param-reassign
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }

  Object.keys(o).forEach((k) => {
    if (new RegExp(`(${k})`).test(fmt)) {
      // eslint-disable-next-line no-param-reassign
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    }
  });

  return fmt;
}


/**
 * 格式化相对时间
 *
 * @export
 * @param {*} time 目标时间
 * @param {*} fmt 格式
 * @returns
 */
export function fromNow(time: number | string, fmt?: string) {
  const d = new Date(time);
  const now = Date.now();
  const diff = (now - d) / 1000;
  const dayDiff = Math.floor(diff / 86400);

  if (diff < 0) {
    console.warn(`${time} more than the current time`);
    return time;
  }

  if (diff < 60) {
    return '刚刚';
  }
  if (diff < 3600) {
    return `${Math.ceil(diff / 60)}分钟前`;
  }
  if (diff < 3600 * 24) {
    return `${Math.floor(diff / 3600)}小时前`;
  }
  if (dayDiff === 1) {
    return '昨天';
  }
  if (dayDiff < 30) {
    return `${dayDiff}天前`;
  }
  if (fmt) {
    return parseTime(time, fmt);
  }

  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日${d.getHours()}时${d.getMinutes()}分${d.getSeconds()}秒`;
}
