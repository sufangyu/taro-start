import { useState } from '@tarojs/taro';

function useInput<S>(initialState: S): [S, (e: any, key?: string, validator?: Function) => S] {
  const [val, setVal] = useState<S>(initialState);

  /**
   * 处理输入值设置
   *
   * @param {{ detail: { value: any; }; }} e 当前输入框对象
   * @param {string} [key] 对象值 key
   * @param {Function} [validator] 特殊处理的函数, 需 return 处理后的值
   * @returns
   */
  function handleInput(e: { detail: { value: any; }; }, key?: string, validator?: Function) {
    let { value } = e.detail;
    value = value.trim();
    // 处理特殊限制
    if (validator) {
      value = validator(value);
    }
    if (key) {
      setVal((prevVal) => ({
        ...prevVal,
        [key]: value,
      }));
    } else {
      setVal(value);
    }
    return value;
  }

  return [val, handleInput];
}

export default useInput;
