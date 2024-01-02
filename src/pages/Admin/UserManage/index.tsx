import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, ProForm, ProFormText, ProTable } from '@ant-design/pro-components';
import { Button, Image, message, Popconfirm, Tag } from 'antd';
import { useRef } from 'react';
import { adminUpdateUser, deleteUser, searchUsers } from '@/services/ant-design-pro/api';
import { ProFormSelect } from '@ant-design/pro-form';
import { selectAvatarUrl, selectGender, selectUserRole, selectUserStatus } from '@/constans';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

// 定义列对应后端字段
const columns: ProColumns<API.CurrentUser>[] = [
  {
    hideInSearch: true,
    title: '头像',
    dataIndex: 'avatarUrl',
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} width="80px" height="80px" />
      </div>
    ),
    copyable: true,
    align: 'center',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    //copyable: true,
    ellipsis: true,
    tip: '用户名称',
    align: 'center',
  },
  {
    title: '用户账户',
    dataIndex: 'userAccount',
    //copyable: true,
    align: 'center',
  },
  {
    title: '编号',
    dataIndex: 'idCode',
    //copyable: true,
    align: 'center',
  },
  {
    title: '电话',
    dataIndex: 'phone',
    //copyable: true,
    align: 'center',
  },
  {
    title: '邮件',
    dataIndex: 'email',
    //copyable: true,
    align: 'center',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    // 枚举
    valueType: 'select',
    valueEnum: {
      1: { text: '男' },
      0: { text: '女' },
    },
    align: 'center',
  },
  {
    title: '用户状态',
    dataIndex: 'userStatus',
    // 枚举
    valueType: 'select',
    valueEnum: {
      0: { text: <Tag color="success">正常</Tag>, status: 'Success' },
      1: { text: <Tag color="warning">注销</Tag>, status: 'Default' },
    },
    align: 'center',
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
    // 枚举
    valueType: 'select',
    valueEnum: {
      0: { text: <Tag color="default">普通用户</Tag> },
      1: { text: <Tag color="success">管理员</Tag> },
    },
    align: 'center',
  },
  {
    hideInSearch: true,
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    align: 'center',
  },
  {
    title: '操作',
    align: 'center',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <ModalForm<API.CurrentUser>
        title="修改用户信息"
        trigger={
          <Button type="link" size="small">
            修改
          </Button>
        }
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        submitTimeout={2000}
        onFinish={async (values) => {
          await waitTime(1000);
          //点击了提交
          console.log('values 的值为-------');
          //发起请求
          values.id = record.id;
          const isModify = await adminUpdateUser(values);
          if (isModify) {
            message.success('提交成功');
            // 刷新用户信息表单
            location.reload();
            return true;
          }
          return false;
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="username"
            label="用户名"
            placeholder="请输入用户名"
            initialValue={record.username}
          />
          <ProFormText
            width="md"
            name="userAccount"
            label="用户账户"
            placeholder="请输入账户"
            initialValue={record.userAccount}
          />
          <ProFormText
            width="md"
            name="userCode"
            label="用户编号"
            placeholder="请输入编号"
            initialValue={record.idCode}
          />
          <ProFormText
            width="md"
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
            initialValue={record.phone}
          />
          <ProFormText
            width="md"
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
            initialValue={record.email}
          />
          <ProFormSelect
            name="gender"
            fieldProps={{
              size: 'large',
            }}
            label="性别"
            options={selectGender}
            placeholder="请选择性别"
            initialValue={record.gender}
            rules={[
              {
                required: false,
                message: '请选择性别',
              },
            ]}
          />
          <ProFormSelect
            name="userStatus"
            fieldProps={{
              size: 'large',
            }}
            label="用户状态"
            options={selectUserStatus}
            initialValue={record.userStatus}
            placeholder={'选择用户状态'}
            rules={[
              {
                required: true,
                message: '请选择用户状态',
              },
            ]}
          />
          <ProFormSelect
            name="userRole"
            fieldProps={{
              size: 'large',
            }}
            label="用户角色"
            options={selectUserRole}
            initialValue={record.userRole}
            placeholder={'选择用户角色'}
            rules={[
              {
                required: true,
                message: '请选择用户角色',
              },
            ]}
          />
          <ProFormSelect
            name="avatarUrl"
            fieldProps={{
              size: 'large',
            }}
            label="用户头像"
            options={selectAvatarUrl}
            placeholder={'请选择用户头像 '}
            initialValue={record.avatarUrl}
            rules={[
              {
                required: true,
                message: '请输入选择用户头像!',
              },
            ]}
          />
        </ProForm.Group>
      </ModalForm>,
      <a key="view">
        <Popconfirm
          title="删除用户"
          // description="你确定要删除他吗？"
          onConfirm={async (e) => {
            const isDelete = await deleteUser({ id: record.id });
            if (isDelete) {
              message.success('删除成功');
              // 刷新用户信息表单
              location.reload();
            } else {
              message.error('删除失败');
            }
          }}
          onCancel={(e) => {}}
          okText="确定"
          cancelText="取消"
        >
          <Button type="link" size="small" danger>
            删除
          </Button>
        </Popconfirm>
      </a>,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();

  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      // 获取后端的数据，返回到表格
      request={async (params = {}, sort, filter) => {
        await waitTime(2000);
        const userList = await searchUsers({ ...params });
        return { data: userList };
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          // @ts-ignore
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="用户信息"
    />
  );
};
