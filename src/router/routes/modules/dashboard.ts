import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/info',
  meta: {
    orderNo: 10,
    icon: 'ant-design:user-outlined',
    title: t('routes.dashboard.dashboard'),
  },
  children: [
    {
      path: 'info',
      name: 'info',
      component: () => import('/@/views/dashboard/desc/index.vue'),
      meta: {
        // affix: true,
        icon: 'ant-design:idcard-outlined',
        title: t('routes.dashboard.info'),
      },
    },
    {
      path: 'setting',
      name: 'setting',
      component: () => import('/@/views/dashboard/setting/index.vue'),
      meta: {
        icon: 'ant-design:setting-outlined',
        title: t('routes.dashboard.setting'),
      },
    },
    {
      path: 'password',
      name: 'password',
      component: () => import('/@/views/dashboard/password/index.vue'),
      meta: {
        icon: 'ant-design:key-outlined',
        title: t('routes.dashboard.password'),
      },
    },
  ],
};

export default dashboard;
