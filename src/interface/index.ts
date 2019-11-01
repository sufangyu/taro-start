/**
 * 选择图片的接口
 *
 * @export
 * @interface IChooseImage
 */
export interface IChooseImage {
  /**
   * 返回信息
   *
   * @type {string}
   * @memberof IChooseImage
   */
  errMsg: string,

  /**
   * 文件路径
   *
   * @type {string[]}
   * @memberof IChooseImage
   */
  tempFilePaths?: string[],

  /**
   * 文件信息
   *
   * @type {object[]}
   * @memberof IChooseImage
   */
  tempFiles?: object[],
}
