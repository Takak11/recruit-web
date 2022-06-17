import { string } from 'vue-types';

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}
export interface UpdatePassworParams {
  currentPassword: string;
  newPassword: string;
}
export interface UpdateUserParams {
  age: number;
  mail: string;
  mobile: string;
  name: string;
  sex: number;
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
  mail: string;
  // 头像
  avatar: string;
  age: number;
  sex: number;
  mobile: string;
  expiredDate: string;
  // 介绍
  desc?: string;
}

export interface UserRegisterModel {
  mobile: string;
  mail: string;
  name: string;
  password: string;
  sms: string;
}

export interface UsernameModel {
  username: string;
}

export interface ResetPasswordModel {
  username: string;
  password: string;
  mail: string;
  sms: string;
}

export interface PasswordModel {
  password: string;
}
