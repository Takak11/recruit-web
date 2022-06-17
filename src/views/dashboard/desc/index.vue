<template>
  <PageWrapper title="用户个人信息">
    <Description
      class="mt-4"
      title="个人信息"
      layout="vertical"
      :collapseOptions="{ canExpand: true, helpMessage: '详情请查看表格内容' }"
      :column="2"
      :data="userInformation"
      :schema="schema"
    />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { getUserInfo } from '/@/api/sys/user';
  import { Description, DescItem } from '/@/components/Description/index';
  import { PageWrapper } from '/@/components/Page';
  import { TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
  import { PageEnum } from '/@/enums/pageEnum';
  import { router } from '/@/router';
  import { useUserStore } from '/@/store/modules/user';
  import { getAuthCache, setAuthCache } from '/@/utils/auth';

  const schema: DescItem[] = [
    {
      field: 'username',
      label: '用户名',
    },
    {
      field: 'name',
      label: '昵称',
    },
    {
      field: 'mobile',
      label: '联系电话',
    },
    {
      field: 'mail',
      label: '邮箱',
    },
    {
      field: 'age',
      label: '年龄',
    },
    {
      field: 'sex',
      label: '性别',
      render: (data) => {
        return data === 0 ? '女' : '男';
      },
    },
    {
      field: 'expiredDate',
      label: '登陆状态过期时间',
    },
  ];
  export default defineComponent({
    components: { Description, PageWrapper },
    setup() {
      const userStore = useUserStore();
      const userInformation = userStore.getUserInfo;
      if (getAuthCache(USER_INFO_KEY) === undefined) {
        router.push(PageEnum.BASE_LOGIN);
        setAuthCache(TOKEN_KEY, undefined);
      }
      return { userInformation, schema };
    },
  });
</script>
