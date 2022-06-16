import { ErrorMessageMode } from '/#/axios';
import { MailInfo, MailSMSInfo, SMSResult } from '/#/store';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  SendCode = '/api/recruit/common/sms',
}
export function getSMSApi(mail: MailInfo, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<SMSResult>(
    {
      url: Api.SendCode,
      params: mail,
    },
    {
      errorMessageMode: mode,
    },
  );
}
