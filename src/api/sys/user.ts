import { defHttp } from '/@/utils/http/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  UpdatePassworParams,
  UpdateUserParams,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/api/recruit/login',
  Logout = '/api/recruit/logout',
  UserInfo = '/api/recruit/user/info',
  ChangePassword = '/api/recruit/user/password',
  UpdateUserInfo = '/api/recruit/user/update',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: user logout api
 */
export function logoutApi(mode: ErrorMessageMode = 'modal') {
  return defHttp.post<void>(
    {
      url: Api.Logout,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.post<GetUserInfoModel>({ url: Api.UserInfo }, { errorMessageMode: 'none' });
}

export function changePassword(params: UpdatePassworParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<boolean>(
    {
      url: Api.ChangePassword,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function updateUserInfo(params: UpdateUserParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<boolean>(
    {
      url: Api.UpdateUserInfo,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
