import { FormSchema } from '/@/components/Form/index';

export interface ListItem {
  key: string;
  title: string;
  description: string;
  extra?: string;
  avatar?: string;
  color?: string;
}

// tab的list
export const settingList = [
  {
    key: '1',
    name: '基本设置',
    component: 'BaseSetting',
  },
  {
    key: '2',
    name: '安全设置',
    component: 'SecureSetting',
  },
];

// 基础设置 form
export const baseSetschemas: FormSchema[] = [
  {
    field: 'username',
    component: 'Input',
    label: '邮箱',
    colProps: { span: 25 },
  },
  {
    field: 'name',
    component: 'Input',
    label: '昵称',
    colProps: { span: 25 },
  },
  {
    field: 'mobile',
    component: 'Input',
    label: '联系电话',
    colProps: { span: 25 },
  },
  {
    field: 'age',
    component: 'Input',
    label: '年龄',
    colProps: { span: 15 },
  },
  {
    field: 'sex',
    component: 'Select',
    label: '性别',
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
    colProps: { span: 15 },
  },
];

// 安全设置 list
export const secureSettingList: ListItem[] = [
  {
    key: '1',
    title: '账户密码',
    description: '*********',
    extra: '修改',
  },
  {
    key: '2',
    title: '密保手机',
    description: '',
    extra: '修改',
  },
  {
    key: '3',
    title: '邮箱',
    description: '',
    extra: '修改',
  },
];
