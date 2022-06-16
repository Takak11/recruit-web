import { defineStore } from 'pinia';
import { store } from '..';
import { MailInfo, SMSResult } from '/#/store';
import { getSMSApi } from '/@/api/sys/user';

interface SMSState {
  sms: Nullable<SMSResult>;
}

export const useSMSStore = defineStore({
  id: 'app-sms',
  state: (): SMSState => ({
    sms: null,
  }),
  getters: {
    getSMSCode(): SMSResult {
      return this.sms || { sms: '' };
    },
  },
  actions: {
    async getSMSAction(mail: MailInfo): Promise<SMSResult | null> {
      const sms = await getSMSApi(mail);
      this.sms = sms;
      return sms;
    },
  },
});

export function useSMSStoreWithOut() {
  return useSMSStore(store);
}
