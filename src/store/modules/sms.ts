import { defineStore } from 'pinia';
import { store } from '..';
import { MailSMSInfo } from '/#/store';
import { getSMSApi } from '/@/api/common/sms';

export const useSMSStore = defineStore({
  id: 'app-sms',
  state: () => ({
    sms: '',
  }),
  getters: {
    getSMSCode: (state): any => {
      return state.sms || '';
    },
  },
  actions: {
    async getSMSAction(mail: MailSMSInfo) {
      await getSMSApi(mail).then((res) => {
        this.sms = res.sms;
        return res.sms;
      });
    },
  },
});

export function useSMSStoreWithOut() {
  return useSMSStore(store);
}
