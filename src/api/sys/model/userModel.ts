/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  token: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  // 用户名
  username: string;
  // 真实名字
  name: string;
  // 头像
  avatar: string;
  age: number;
  sex: string;
  mobile: string;
  expiredDate: string;
  // 介绍
  desc?: string;
}
