<template>
  <PageWrapper title="修改当前用户密码" content="修改成功后会自动退出当前登录！">
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicForm @register="register" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> 重置 </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </a-button>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form';

  import { formSchema } from './pwd.data';
  import { useUserStore } from '/@/store/modules/user';
  import { router } from '/@/router';
  import { PageEnum } from '/@/enums/pageEnum';
  import { setAuthCache } from '/@/utils/auth';
  import { TOKEN_KEY } from '/@/enums/cacheEnum';
  export default defineComponent({
    name: 'ChangePassword',
    components: { BasicForm, PageWrapper },
    setup() {
      const [register, { validate, resetFields }] = useForm({
        size: 'large',
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: formSchema,
      });

      async function handleSubmit() {
        const values = await validate();
        const userStore = useUserStore();
        const result = await userStore.changePassword({
          currentPassword: values.passwordOld,
          newPassword: values.passwordNew,
        });
        if (result === true) {
          userStore
            .logout(true)
            .then(
              () =>
                (window.location.href = 'https://localhost:8087/login?redirect=/dashbord/password'),
            );
          return;
        }
      }

      return { register, resetFields, handleSubmit };
    },
  });
</script>
