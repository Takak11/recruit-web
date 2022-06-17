<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="account" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem>

      <FormItem name="mail" class="enter-x">
        <Input size="large" v-model:value="formData.mail" :placeholder="t('sys.login.email')" />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <CountdownInput
          size="large"
          :sendCodeApi="sendCode"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem>
      <FormItem name="password" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>

      <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleReset" :loading="loading">
          {{ t('common.resetText') }}
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
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, InputPassword } from 'ant-design-vue';
  import { CountdownInput } from '/@/components/CountDown';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, LoginStateEnum, useFormValid } from './useLogin';
  import { useUserStore } from '/@/store/modules/user';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useSMSStore } from '/@/store/modules/sms';

  const FormItem = Form.Item;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    account: '',
    mail: '',
    sms: '',
    password: '',
  });

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);

  const { validForm } = useFormValid(formRef);
  const userStore = useUserStore();
  const smsStore = useSMSStore();
  const { createSuccessModal, createErrorModal } = useMessage();
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
  async function handleReset() {
    loading.value = true;
    let data = null;
    try {
      data = await validForm();
    } catch (err) {
      loading.value = false;
    }

    if (!data) {
      return;
    }
    const { account, sms, mail, password } = data;
    let ret;
    try {
      ret = await userStore.resetPassword({
        mail: mail,
        sms: sms,
        username: account,
        password: password,
        mode: 'modal',
      });
    } catch (err) {}
    if (ret) {
      createSuccessModal({
        title: '成功',
        content: '用户密码已被重置，请牢记新密码',
        onOk: () => {
          window.location.href = 'https://localhost:8087/login';
        },
      });
    }
    return;
  }
</script>
