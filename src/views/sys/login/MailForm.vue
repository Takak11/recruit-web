<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="mail" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.mail"
          :placeholder="t('sys.login.email')"
          class="fix-auto-fill"
        />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <CountdownInput
          size="large"
          class="fix-auto-fill"
          v-model:value="formData.sms"
          :sendCodeApi="sendCode"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem>

      <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
          {{ t('sys.login.loginButton') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref } from 'vue';
  import { Form, Input, Button, notification } from 'ant-design-vue';
  import { CountdownInput } from '/@/components/CountDown';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useSMSStore } from '/@/store/modules/sms';
  import { useUserStore } from '/@/store/modules/user';

  const FormItem = Form.Item;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    mail: '',
    sms: '',
  });

  const { validForm } = useFormValid(formRef);

  const { createErrorModal } = useMessage();
  const userStore = useUserStore();
  const smsStore = useSMSStore();
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.MAIL);

  async function sendCode() {
    const { mail, sms } = formData;
    if (!mail) {
      createErrorModal({
        title: '错误',
        content: '请填写邮箱后发送',
      });
    }
    await smsStore.getSMSAction({
      mail: mail,
      sms: sms,
    });

    return true;
  }
  async function handleLogin() {
    const data = await validForm();
    if (!data) return;

    if (data.sms != smsStore.$state.sms) {
      createErrorModal({
        title: '错误',
        content: '验证码错误，请检查后重新登录',
      });
      return;
    }
    loading.value = true;
    const userInfo = await userStore.loginWithMail({
      mail: data.mail,
      sms: data.sms,
      mode: 'modal',
    });
    if (userInfo) {
      notification.success({
        message: t('sys.login.loginSuccessTitle'),
        description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.name}`,
        duration: 3,
      });
    }
  }
</script>
