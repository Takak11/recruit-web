import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/account',
  meta: {
    orderNo: 10,
    icon: 'ion:settings-outline',
    title: t('routes.demo.system.moduleName'),
  },
  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        icon: 'ant-design:team-outlined',
        title: t('routes.demo.system.account'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/demo/system/account/index.vue'),
    },
    {
      path: 'account_detail/:id',
      name: 'AccountDetail',
      meta: {
        hideMenu: true,
        title: t('routes.demo.system.account_detail'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/system/account',
      },
      component: () => import('/@/views/demo/system/account/AccountDetail.vue'),
    },
  ],
};

export default system;
