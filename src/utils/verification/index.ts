/* eslint-disable no-dupe-class-members */
import rule from './rule';

type name = keyof typeof rule;
type value = string | boolean | any[];

interface IList {
  /**
   * 值
   *
   * @type {value}
   * @memberof IList
   */
  value: value;

  /**
   * 校验类型
   *
   * @type {name}
   * @memberof IList
   */
  type: name;

  /**
   * 错误提示内容
   *
   * @type {string}
   * @memberof IList
   */
  msg: string;

  /**
   * 最小长度
   *
   * @type {number}
   * @memberof IList
   */
  minLen?: number;

  /**
   * 最大长度
   *
   * @type {number}
   * @memberof IList
   */
  maxLen?: number;

  /**
   * 自定义校验规则
   *
   * @type {Function}
   * @memberof IList
   */
  validator?: Function;
}

interface IAdd {
  /**
   * 校验类型
   *
   * @type {name}
   * @memberof IList
   */
  type: name;

  /**
   * 错误提示内容
   *
   * @type {string}
   * @memberof IList
   */
  msg: string;

  /**
   * 最小长度
   *
   * @type {number}
   * @memberof IList
   */
  minLen?: number;

  /**
   * 最大长度
   *
   * @type {number}
   * @memberof IList
   */
  maxLen?: number;

  /**
   * 自定义校验规则
   *
   * @type {Function}
   * @memberof IList
   */
  validator?: Function;
}


class Verification {
  /**
   * 校验列表
   *
   * @private
   * @type {IList[]}
   * @memberof Verification
   */
  private list: IList[] = [];

  /**
   * 校验结果信息
   *
   * @type {string}
   * @memberof Verification
   */
  public message: string;

  add(value: value, type: name, msg: string): void;

  add(value: value, ruleArr: Array<IAdd>): void;

  add(value: value, ruleArr: Array<IAdd> | name, msg?: string): void {
    if (Array.isArray(ruleArr)) {
      // 多个校验规则
      const validateList = ruleArr.map((f) => {
        return {
          value,
          type: f.type,
          msg: f.msg,
          minLen: f.minLen,
          maxLen: f.maxLen,
          validator: f.validator,
        };
      });
      this.list.push(...validateList);
    } else {
      // 指定校验规则
      this.list.push({
        value,
        type: ruleArr,
        msg: msg || '',
      });
    }
  }

  /**
   * 校验结构
   *
   * @returns {boolean}
   * @memberof Verification
   */
  result(): boolean {
    for (let i = 0; i < this.list.length; i += 1) {
      const {
        value, type, msg, minLen, maxLen, validator,
      } = this.list[i];
      const fn = rule[type]({
        value,
        msg,
        minLen,
        maxLen,
        validator,
      });

      if (fn) {
        this.message = msg;
        return false;
      }
    }
    this.message = '';
    return true;
  }
}

export default Verification;
