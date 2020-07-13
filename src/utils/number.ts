/**
 * 格式化保留小数位
 *
 * @export
 * @param {string} [value=''] 值
 * @param {number} [decimal=1] 保留小数位
 * @returns {string}
 */
export function formatNumberToDigit(value: string = '', decimal: number = 1): string {
  let fValue = value;
  fValue = fValue.replace(/[^\d.]/g, ''); // 清除"数字"和"."以外的字符
  fValue = fValue.replace(/^\./g, ''); // 验证第一个字符是数字而不是
  fValue = fValue.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
  fValue = fValue.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
  switch (decimal) {
    case 1:
      // eslint-disable-next-line no-useless-escape
      fValue = fValue.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'); // 只能输入一个小数
      break;
    case 2:
      // eslint-disable-next-line no-useless-escape
      fValue = fValue.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
      break;
    case 3:
      // eslint-disable-next-line no-useless-escape
      fValue = fValue.replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3'); // 只能输入三个小数
      break;
    default:
  }
  return fValue;
}


/**
 * 格式化为证书
 *
 * @export
 * @param {string} [value=''] 值
 * @returns {string}
 */
export function formatNumberToInteger(value: string = ''): string {
  return value.replace(/\D/g, '');
}
