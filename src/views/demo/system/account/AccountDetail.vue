<template>
  <PageWrapper
    :title="`用户` + userId + `的资料`"
    content="这是用户资料详情页面。本页面仅用于演示相同路由在tab中打开多个页面并且显示不同的数据"
    contentBackground
    @back="goBack"
  >
    <Description
      class="mt-4"
      title="个人信息"
      layout="vertical"
      :collapseOptions="{ canExpand: true, helpMessage: '详情请查看表格内容' }"
      :column="2"
      :data="getUserDetail()"
      :schema="schema"
    />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { Description, DescItem } from '/@/components/Description/index';
  import { getUserDetailApi } from '/@/api/sys/user';
  import { useUserStore } from '/@/store/modules/user';
  import { log } from 'console';
  import { get } from 'sortablejs';
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
  ];
  export default defineComponent({
    name: 'AccountDetail',
    components: { PageWrapper, Description },
    setup() {
      const route = useRoute();
      const go = useGo();
      const userStore = useUserStore();
      let userData = [];
      //

      // 此处可以得到用户ID
      const userId = ref(route.params?.id);
      const currentKey = ref('detail');
      const { setTitle } = useTabs();
      // 设置Tab的标题（不会影响页面标题）
      setTitle('详情：用户' + userId.value);

      function getUserDetail() {
        return userStore.$state.profile;
      }

      // 页面左侧点击返回链接时的操作
      function goBack() {
        // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
        go('/system/account');
      }
      return { userId, currentKey, goBack, schema, getUserDetail };
    },
  });
</script>

<style></style>
