import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
const IFrame = () => import('/@/views/sys/iframe/FrameBlank.vue');
import { t } from '/@/hooks/web/useI18n';

const iframe: AppRouteModule = {
  path: '/project',
  name: 'Frame',
  component: LAYOUT,
  meta: {
    orderNo: 10,
    icon: 'ion:tv-outline',
    title: t('routes.demo.iframe.overview'),
  },

  children: [
    {
      path: 'doc',
      name: 'Doc',
      component: IFrame,
      meta: {
        icon: 'ant-design:file-outlined',
        frameSrc: 'http://localhost:8088/doc.html',
        title: t('routes.demo.iframe.doc'),
      },
    },
  ],
};

export default iframe;
