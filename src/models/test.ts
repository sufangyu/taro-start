import { IParamsList } from './index';

/**
 * 主题列表参数
 *
 * @export
 * @interface ITopics
 * @extends {IParamsList}
 */
export interface IParamsTopics extends IParamsList {
  /**
   * 主题分类
   *
   * @type {('all' | 'ask' | 'share' | 'job' | 'good')}
   */
  tab: 'all' | 'ask' | 'share' | 'job' | 'good';
  /**
   * 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
   *
   * @type {boolean}
   */
  mdrender?: boolean;
}


/**
 * 主题
 *
 * @export
 * @interface ITopic
 */
export interface ITopic {
  /**
   * ID
   *
   * @type {string}
   */
  id: string;
  /**
   * 作者信息
   *
   * @type {{ avatar_url: string; loginname: string;}}
   */
  author: { avatar_url: string; loginname: string;};
  /**
   * 作者 ID
   *
   * @type {string}
   */
  author_id: string;
  /**
   * 内容
   *
   * @type {string}
   */
  content: string;
  /**
   * 创建时间
   *
   * @type {string}
   */
  create_at: string;
  good: boolean;
  last_reply_at: string;
  reply_count: number;
  tab: string;
  title: string;
  top: boolean;
  visit_count: number;
}
