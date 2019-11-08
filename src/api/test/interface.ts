export interface IAddress {
  city: string;
  privent: string;
}

export interface IResponeUser<T=any> {
  /**
   * 用户Id
   *
   * @type {string}
   * @memberof IUserRespone
   */
  id: string;
  name: string;
  age: number;
  address: T;
}
