import type { UserInfo } from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { RoleEnum } from '/@/enums/roleEnum';
import { PageEnum } from '/@/enums/pageEnum';
import { TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import {
  GetUserInfoModel,
  LoginParams,
  UpdatePassworParams,
  UpdateUserParams,
} from '/@/api/sys/model/userModel';
import { changePassword, getUserInfo, loginApi, updateUserInfo } from '/@/api/sys/user';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
import { isArray } from '/@/utils/is';
import { h } from 'vue';
import { useMultipleTabStore } from './multipleTab';
import { AvatarEnum } from '/@/enums/avatarPrefixEnum';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token: string;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: '',
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      setAuthCache(USER_INFO_KEY, info);
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);
        const { token } = data;

        // save token
        this.setToken(token);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      // get user info
      const userInfo = await this.getUserInfoAction();
      goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
      return userInfo;
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      const userInfo = await getUserInfo();
      const avatarId = userInfo.avatar;
      const avatar = AvatarEnum.Prefix + avatarId;
      if (userInfo.avatar !== null) {
        userInfo.avatar = avatar;
      }
      this.setUserInfo(userInfo);
      return userInfo;
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      this.setToken(undefined);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },
    async updateUserInfo(
      params: UpdateUserParams & {
        mode?: ErrorMessageMode;
      },
    ) {
      const result = await updateUserInfo(params);
      const info = await this.getUserInfoAction();
      this.setUserInfo(info);

      const { createSuccessModal, createWarningModal } = useMessage();
      if (result === true) {
        createSuccessModal({
          iconType: 'success',
          title: '成功',
          content: '更新用户信息成功！',
          onOk: () => {
            const tabStore = useMultipleTabStore();
            tabStore.refreshPage(router);
          },
        });
      } else {
        createWarningModal({
          iconType: 'warning',
          title: '提示',
          content: '用户信息无更新时，请不要点击更新',
        });
      }
    },

    async changePassword(
      params: UpdatePassworParams & {
        mode?: ErrorMessageMode;
      },
    ): Promise<boolean | null> {
      try {
        const data = await changePassword(params);
        const result = data;

        return result;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
