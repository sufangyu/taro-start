import { Pagination } from './index';

/**
 * 主题列表参数
 *
 * @export
 * @interface Topic
 * @extends {Pagination}
 */
export interface IParamsTopics extends Pagination {
  /** 主题分类 */
  tab: 'all' | 'ask' | 'share' | 'job' | 'good';
  /**
   * 当为 false 时，不渲染
   * 默认为 true，渲染出现的所有 markdown 格式文本。
   */
  mdrender?: boolean;
}


/**
 * 主题
 *
 * @export
 * @interface Topic
 */
export interface Topic {
  /** ID */
  id: string;
  /** 作者信息 */
  author: { avatar_url: string; loginname: string;};
  /** 作者 ID */
  author_id: string;
  /** 内容 */
  content: string;
  /** 创建时间 */
  create_at: string;
  good: boolean;
  last_reply_at: string;
  reply_count: number;
  tab: string;
  title: string;
  top: boolean;
  visit_count: number;
}
