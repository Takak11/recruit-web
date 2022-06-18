import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const feat: AppRouteModule = {
  path: '/feat',
  name: 'FeatDemo',
  component: LAYOUT,
  redirect: '/feat/index',
  meta: {
    orderNo: 19,
    icon: 'ion:git-compare-outline',
    title: t('routes.demo.feat.feat'),
  },

  children: [
    {
      path: 'index',
      component: () => import('/@/views/demo/editor/markdown/index.vue'),
      name: 'MarkdownDemo',
      meta: {
        icon: 'ant-design:file-pdf-outlined',
        title: t('routes.demo.editor.markdown'),
      },
    },
  ],
};

export default feat;
