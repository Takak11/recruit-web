import { defHttp } from '/@/utils/http/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  UpdatePassworParams,
  UpdateUserParams,
  UsernameModel,
  UserRegisterModel,
  ResetPasswordModel,
  PasswordModel,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { IdModel, MailSMSInfo, UserAddModel, UserDetail, UserEditModel } from '/#/store';

enum Api {
  Login = '/api/recruit/login',
  LoginWithMail = '/api/recruit/login/mail',
  ResetPassword = '/api/recruit/reset',
  Logout = '/api/recruit/logout',
  UserInfo = '/api/recruit/user/info',
  ChangePassword = '/api/recruit/user/password',
  UpdateUserInfo = '/api/recruit/user/update',
  Register = '/api/recruit/user/register',
  Detail = '/api/recruit/user/detail',
  Delete = '/api/recruit/user/delete',
  Edit = '/api/recruit/user/edit',
  Add = '/api/recruit/user/add',
  Resume = '/api/recruit/common/resume',
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

export function loginWithMailApi(params: MailSMSInfo, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.LoginWithMail,
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
export function logoutApi(mode: ErrorMessageMode = 'none') {
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

export function getUserDetailApi(params: IdModel) {
  return defHttp.post<UserDetail>(
    { url: Api.Detail, params: params },
    { errorMessageMode: 'none' },
  );
}

export function deleteUserApi(params: IdModel) {
  return defHttp.post<Boolean>({
    url: Api.Delete,
    params: params,
  });
}

export function editUserApi(params: UserEditModel) {
  return defHttp.post<Boolean>({
    url: Api.Edit,
    params: params,
  });
}

export function addUserApi(params: UserAddModel) {
  return defHttp.post<UsernameModel>({
    url: Api.Add,
    params: params,
  });
}
export function register(param: UserRegisterModel, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<UsernameModel>(
    {
      url: Api.Register,
      params: param,
    },
    {
      errorMessageMode: mode,
    },
  );
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
export function resetPasswordApi(params: ResetPasswordModel, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<PasswordModel>(
    {
      url: Api.ResetPassword,
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
