<template>
  <PageWrapper title="简历在线编辑">
    <BasicUpload
      :maxSize="20"
      :maxNumber="10"
      @change="handleUpload"
      :api="uploadResumeApi"
      class="my-5"
    />
    <div>
      <a-button @click="clearValue" class="mb-2" type="default"> 清空内容 </a-button>

      <MarkDown v-model:value="value" @change="handleChange" ref="markDownRef" placeholder="" />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { MarkDown, MarkDownActionType, MarkdownViewer } from '/@/components/Markdown';
  import { PageWrapper } from '/@/components/Page';
  import { Alert, Card } from 'ant-design-vue';
  import { uploadApi, uploadResumeApi } from '/@/api/sys/upload';
  import { BasicUpload } from '/@/components/Upload';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { FormSchema, useForm } from '/@/components/Form';

  const schemas: FormSchema[] = [
    {
      field: 'file',
      component: 'Upload',
      label: '文件',
      colProps: {
        span: 8,
      },
      rules: [{ required: true, message: '请选择上传文件' }],
      componentProps: {
        api: uploadResumeApi,
      },
    },
  ];
  export default defineComponent({
    components: { MarkDown, PageWrapper, BasicUpload, [Alert.name]: Alert },
    setup() {
      const markDownRef = ref<Nullable<MarkDownActionType>>(null);
      const valueRef = ref(`
# 简历标题

# 简历内容
`);

      function handleChange(v: string) {
        valueRef.value = v;
      }

      function clearValue() {
        valueRef.value = '';
      }
      const { createMessage } = useMessage();
      const [register] = useForm({
        labelWidth: 120,
        schemas,
        actionColOptions: {
          span: 16,
        },
      });
      return {
        handleUpload: () => {
          createMessage.info(`上传成功`);
        },
        uploadResumeApi,
        handleChange,
        uploadApi,
        register,
        value: valueRef,
        markDownRef,
        clearValue,
      };
    },
  });
</script>
