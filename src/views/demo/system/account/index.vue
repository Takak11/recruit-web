<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" class="w-100% xl:w-100%" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增账号</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:eye-outlined',
              tooltip: '查看用户简历',
              onClick: handleViewResume.bind(null, record),
            },
            {
              icon: 'clarity:info-standard-line',
              tooltip: '查看用户详情',
              onClick: handleView.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑用户资料',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除此账号',

              popConfirm: {
                title: '是否确认删除',
                placement: 'left',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getAccountList } from '/@/api/demo/system';
  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal';
  import AccountModal from './AccountModal.vue';

  import { columns, searchFormSchema } from './account.data';
  import { useGo } from '/@/hooks/web/usePage';
  import { AvatarEnum } from '/@/enums/avatarPrefixEnum';
  import { deleteUserApi } from '/@/api/sys/user';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { router } from '/@/router';
  import { useUserStore } from '/@/store/modules/user';
  export default defineComponent({
    name: 'AccountManagement',
    components: { BasicTable, PageWrapper, AccountModal, TableAction },
    setup() {
      const go = useGo();
      const userStore = useUserStore();
      const { createErrorModal } = useMessage();
      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
        canResize: true,
        title: '账号列表',
        api: getAccountList,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        handleSearchInfoFn(info) {
          console.log('handleSearchInfoFn', info);
          return info;
        },
        actionColumn: {
          width: 150,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        console.log(record);
        openModal(true, {
          isUpdate: true,
          record,
        });
      }

      function handleDelete(record: any) {
        console.log(record);
        const { id } = record;
        deleteUser(id);
      }
      async function deleteUser(id: any) {
        const result = await deleteUserApi({
          id: id,
        });
        if (result) {
          router.go(0);
        }
      }

      function handleSuccess({ isUpdate, values }) {
        const { name, username, sex, age, mobile, mail, password } = values;
        if (isUpdate) {
          userStore.editUserAction({
            name,
            username,
            sex,
            age,
            mobile,
            mail,
          });
          router.go(0);
        } else {
          userStore.addUserAction({
            name,
            sex,
            age,
            mobile,
            mail,
            password,
          });
        }
      }

      function handleView(record: Recordable) {
        const { id } = record;

        userStore.getUserDetailAction({
          id,
        });
        go(`/system/account_detail/${id}`);
      }

      function handleViewResume(record: Recordable) {
        const { id } = record;
        window.open(`http://localhost:8088/api/recruit/common/resume/${id}`);
      }
      return {
        // getUserList,
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleView,
        handleViewResume,
        searchInfo,
      };
    },
  });
</script>
