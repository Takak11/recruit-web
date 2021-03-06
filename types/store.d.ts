import { ErrorTypeEnum } from '/@/enums/exceptionEnum';
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';
import { RoleInfo } from '/@/api/sys/model/userModel';

// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined;
  // Is it locked?
  isLock?: boolean;
}

// Error-log information
export interface ErrorLogInfo {
  // Type of error
  type: ErrorTypeEnum;
  // Error file
  file: string;
  // Error name
  name?: string;
  // Error message
  message: string;
  // Error stack
  stack?: string;
  // Error detail
  detail: string;
  // Error url
  url: string;
  // Error time
  time?: string;
}

export interface UserInfo {
  mail: string;
  username: string;
  name: string;
  age: number;
  sex: number;
  mobile: string;
  avatar: string;
  expiredDate: string;
  desc?: string;
  homePath?: string;
}
export interface UserDetail {
  mail: string;
  username: string;
  name: string;
  mobile: string;
  age: number;
  sex: number;
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}

export interface SMSResult {
  sms: string;
}

export interface MailSMSInfo {
  sms: string;
  mail: string;
}
export interface IdModel {
  id: any;
}
export interface UserEditModel {
  name: string;
  username: string;
  age: number;
  sex: number;
  mail: string;
  mobile: string;
}
export interface UserAddModel {
  name: string;
  age: number;
  sex: number;
  mail: string;
  mobile: string;
  password: string;
}
