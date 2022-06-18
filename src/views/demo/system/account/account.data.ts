import { h } from 'vue-demi';
import { getAllRoleList, isAccountExist } from '/@/api/demo/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import headerImg from '/@/assets/images/header.jpg';
import { AvatarEnum } from '/@/enums/avatarPrefixEnum';
import { text } from 'stream/consumers';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 120,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 100,
    customRender: ({ record }) => {
      if (record.avatar != null) {
        return h('img', { src: AvatarEnum.Prefix + record.avatar });
      } else {
        return h('img', { src: headerImg });
      }
    },
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
    edit: false,
  },
  {
    title: '昵称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'mail',
    width: 120,
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: 50,
    customRender: ({ record }) => {
      return record.sex === 1 ? '男' : '女';
    },
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 50,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: { span: 10 },
  },
  {
    field: 'name',
    label: '昵称',
    component: 'Input',
    colProps: { span: 10 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    show: false,
    colProps: { span: 20 },
  },
  {
    field: 'name',
    label: '昵称',
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'mail',
    label: '邮箱',
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'mobile',
    label: '手机号',
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'age',
    label: '年龄',
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    colProps: { span: 20 },
  },
  {
    field: 'sex',
    label: '性别',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 0,
        },
      ],
    },
    colProps: { span: 20 },
  },
];
