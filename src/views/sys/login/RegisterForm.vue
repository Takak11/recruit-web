<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="name" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.name"
          :placeholder="t('sys.login.name')"
        />
      </FormItem>
      <FormItem name="mobile" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.mobile"
          :placeholder="t('sys.login.mobile')"
          class="fix-auto-fill"
        />
      </FormItem>
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
          :sendCodeApi="sendCode"
          class="fix-auto-fill"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem>
      <FormItem name="password" class="enter-x">
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>
      <FormItem name="confirmPassword" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </FormItem>

      <FormItem class="enter-x" name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <Checkbox v-model:checked="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </Checkbox>
      </FormItem>

      <Button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        {{ t('sys.login.registerButton') }}
      </Button>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, Checkbox } from 'ant-design-vue';
  import { StrengthMeter } from '/@/components/StrengthMeter';
  import { CountdownInput } from '/@/components/CountDown';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { useSMSStore } from '/@/store/modules/sms';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';

  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    name: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    mail: '',
    sms: '',
    policy: false,
  });

  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);
  const { createSuccessModal, createErrorModal } = useMessage();

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);
  const smsStore = useSMSStore();
  const userStore = useUserStore();
  async function sendCode() {
    if (!formData.mail) {
      createErrorModal({
        title: '错误',
        content: '请填写邮箱后发送',
      });
    }
    const { mail, sms } = formData;
    await smsStore.getSMSAction({
      mail: mail,
      sms: sms,
    });

    return true;
  }
  async function handleRegister() {
    const data = await validForm();
    if (!data) return;
    const { mobile, sms, name, password, mail } = data;
    if (data.sms != smsStore.$state.sms) {
      createErrorModal({
        title: '错误',
        content: '验证码错误，请检查后重新提交',
      });

      return;
    }
    await userStore.register({
      mobile: mobile,
      mail: mail,
      password: password,
      name: name,
      sms: sms,
    });
  }
</script>
