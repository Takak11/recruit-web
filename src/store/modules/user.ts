import type {
  IdModel,
  MailSMSInfo,
  UserAddModel,
  UserDetail,
  UserEditModel,
  UserInfo,
} from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { PageEnum } from '/@/enums/pageEnum';
import { TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import {
  GetUserInfoModel,
  LoginParams,
  PasswordModel,
  ResetPasswordModel,
  UpdatePassworParams,
  UpdateUserParams,
  UserRegisterModel,
} from '/@/api/sys/model/userModel';
import {
  changePassword,
  getUserInfo,
  loginApi,
  logoutApi,
  updateUserInfo,
  register,
  loginWithMailApi,
  resetPasswordApi,
  getUserDetailApi,
  editUserApi,
  addUserApi,
} from '/@/api/sys/user';
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
import { resolve } from 'path/posix';
import { reject } from 'lodash';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token: string;
  profile: Object;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: '',
    profile: {},
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
      setAuthCache(TOKEN_KEY, this.getToken);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
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
        setAuthCache(TOKEN_KEY, this.getToken);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async loginWithMail(
      params: MailSMSInfo & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginparams } = params;

        const data = await loginWithMailApi(loginparams, mode);
        const { token } = data;

        // save token
        this.setToken(token);
        setAuthCache(TOKEN_KEY, this.getToken);
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
      if (userInfo.avatar != null) {
        userInfo.avatar = avatar;
      }
      this.$state.userInfo = userInfo;
      setAuthCache(USER_INFO_KEY, userInfo);
      return userInfo;
    },

    async getUserDetailAction(params: IdModel) {
      const userDetail = await getUserDetailApi(params);
      this.$state.profile = userDetail;
    },

    async addUserAction(
      param: UserAddModel & {
        mode?: ErrorMessageMode;
      },
    ) {
      const { createSuccessModal, createErrorModal } = useMessage();
      await addUserApi(param)
        .then((res) => {
          const username = res.username;
          if (username != '' && username != undefined) {
            createSuccessModal({
              title: '成功',
              content: '添加成功！用户名为：' + username,
              onOk: () => {
                router.go(0);
              },
            });
          }
        })
        .catch((err) => {
          createErrorModal({
            title: '错误',
            content: err.response.data.message,
          });
        });
    },
    async editUserAction(params: UserEditModel) {
      await editUserApi(params);
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      await logoutApi();
      this.setToken(undefined);
      this.setUserInfo(null);
      setAuthCache(TOKEN_KEY, undefined);
      setAuthCache(USER_INFO_KEY, null);
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

    async resetPassword(
      params: ResetPasswordModel & {
        mode?: ErrorMessageMode;
      },
    ): Promise<PasswordModel | null> {
      try {
        const data = await resetPasswordApi(params);

        return data;
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

    async register(
      param: UserRegisterModel & {
        mode?: ErrorMessageMode;
      },
    ) {
      const { createErrorModal, createSuccessModal } = useMessage();
      await register(param).then((res) => {
        const username = res.username;
        if (username != '' && username != undefined) {
          createSuccessModal({
            title: '成功',
            content: '注册成功！您的账号为：' + username,
            onOk: () => {
              window.location.href = 'https://localhost:8087/login';
            },
          });
        } else {
          createErrorModal({
            title: '错误',
            content: '注册失败，请联系管理员',
          });
        }
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
