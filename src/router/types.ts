/** 页面传参接口 */
export interface Query {
  /** 姓名 */
  name: string;
  /** 年龄 */
  age: string;
}


export interface Query2 {
  /** 操作类型 */
  action: 'CREATE' | 'EDIT';
}


export interface RootQuery extends Query, Query2 {}
