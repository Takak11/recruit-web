<template>
  <CollapseContainer title="基本设置" :canExpan="false">
    <a-row :gutter="24">
      <a-col :span="14">
        <BasicForm @register="register" />
      </a-col>
      <a-col :span="10">
        <div class="change-avatar">
          <div class="mb-2">头像</div>
          <CropperAvatar
            :uploadApi="uploadAvatar"
            :value="avatar"
            btnText="更换头像"
            :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
            @change="updateAvatar"
            width="150"
          />
        </div>
      </a-col>
    </a-row>
    <Button type="primary" @click="handleSubmit"> 更新基本信息 </Button>
  </CollapseContainer>
</template>
<script lang="ts">
  import { Button, Row, Col } from 'ant-design-vue';
  import { computed, defineComponent, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { CropperAvatar } from '/@/components/Cropper';

  import headerImg from '/@/assets/images/header.jpg';
  import { useUserStore } from '/@/store/modules/user';
  import { uploadApi, uploadAvatar } from '/@/api/sys/upload';
  import { baseSetschemas } from './data';
  import { userInfo } from 'os';
  import { useModal } from '/@/components/Modal';
  import avatar from 'ant-design-vue/lib/avatar';
  import { AvatarEnum } from '/@/enums/avatarPrefixEnum';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    components: {
      BasicForm,
      CollapseContainer,
      Button,
      ARow: Row,
      ACol: Col,
      CropperAvatar,
    },
    setup() {
      const userStore = useUserStore();

      const [register, { setFieldsValue, getFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: baseSetschemas,
        showActionButtonGroup: false,
      });

      onMounted(async () => {
        const userInfo = userStore.getUserInfo;
        setFieldsValue(userInfo);
      });

      const avatar = computed(() => {
        let { avatar } = userStore.getUserInfo;
        return avatar || headerImg;
      });

      function updateAvatar(src: string) {
        const userinfo = userStore.getUserInfo;
        userinfo.avatar = src;
        userStore.setUserInfo(userinfo);
        return;
      }

      return {
        avatar,
        register,
        uploadAvatar: uploadAvatar as any,
        updateAvatar,
        handleSubmit: () => {
          const values = getFieldsValue();
          const { name, sex, age, mail, mobile } = values;

          userStore.updateUserInfo({
            name: name,
            sex: sex,
            age: age,
            mail: mail,
            mobile: mobile,
          });
        },
      };
    },
  });
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
