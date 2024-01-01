import React, { useEffect, useState } from 'react';
import { Descriptions, Divider } from 'antd';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { Image, Button, message } from 'antd';
import { request } from 'umi';
import { modifyPassword, userModify } from '@/services/ant-design-pro/api';
import { ProFormSelect } from '@ant-design/pro-form';
import { DEFAULT_AVATAR_URL, selectAvatarUrl } from '@/constans';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const UserInfo: React.FC = () => {
  const [myUser, setMyUser] = useState({
    id: 0,
    username: '',
    userAccount: '',
    avatarUrl: '',
    gender: '男',
    phone: '',
    email: '',
    userStatus: 0,
    userRole: 'user',
    createTime: '',
    idCode: -1,
  });
  useEffect(() => {
    async function fetch() {
      await request('/api/user/current', { method: 'GET' }).then((res) => {
        setMyUser(res);
      });
    }

    fetch();
  }, []);
  return (
    <>
      <Divider>用户头像</Divider>
      <Descriptions style={{ margin: '20px auto', maxWidth: 500 }}>
        <Descriptions.Item label="头像">
          <Image
            src={myUser.avatarUrl === null ? DEFAULT_AVATAR_URL : myUser.avatarUrl}
            width={300}
            height={300}
          />
        </Descriptions.Item>
      </Descriptions>

      <Divider>用户信息</Divider>
      <Descriptions bordered column={4}>
        <Descriptions.Item label="用户名" span={1.5}>
          {myUser.username}
        </Descriptions.Item>
        <Descriptions.Item label="用户账户" span={1.5}>
          {myUser.userAccount}
        </Descriptions.Item>
        <Descriptions.Item label="用户角色" span={1.5}>
          {myUser.userRole === '0' ? '普通用户' : '管理员'}
        </Descriptions.Item>
        <Descriptions.Item label="用户性别" span={1.5}>
          {myUser.gender !== null ? (myUser.gender === '男' ? '男' : '女') : '未填写'}
        </Descriptions.Item>
        <Descriptions.Item label="用户编号" span={1.5}>
          {myUser.idCode}
        </Descriptions.Item>
        <Descriptions.Item label="创建时间" span={1.5}>
          {new Date(myUser.createTime).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="用户状态" span={1.5}>
          {myUser.userStatus === 0 ? '正常' : '异常'}
        </Descriptions.Item>
        <Descriptions.Item label="用户电话" span={1.5}>
          {myUser.phone === null ? '未填写' : myUser.phone}
        </Descriptions.Item>
        <Descriptions.Item label="用户邮箱" span={3}>
          {myUser.email === null ? '未填写' : myUser.email}
        </Descriptions.Item>
      </Descriptions>

      <ModalForm<API.CurrentUser>
        title="修改本用户信息"
        trigger={
          <Button type="primary" shape="round" style={{ margin: '20px' }}>
            修改信息
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
          //点击发起请求
          values.id = myUser.id;
          const isModify = await userModify(values);
          if (isModify) {
            message.success('修改成功');
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
            initialValue={myUser.username}
          />
          <ProFormText
            width="md"
            name="userCode"
            label="用户编号"
            placeholder="请输入用户编号"
            initialValue={myUser.idCode}
          />
          <ProFormSelect
            name="gender"
            label="性别"
            options={[
              { value: 0, label: '女' },
              { value: 1, label: '男' },
            ]}
            placeholder={'请选择用户性别 '}
            initialValue={myUser.gender}
            rules={[
              {
                required: true,
                message: '请选择性别!',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
            initialValue={myUser.phone}
          />
          <ProFormText
            width="md"
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
            initialValue={myUser.email}
          />
          <ProFormSelect
            name="avatarUrl"
            fieldProps={{
              size: 'large',
            }}
            label="用户头像"
            options={selectAvatarUrl}
            placeholder={'请选择用户头像 '}
            initialValue={myUser.avatarUrl}
            rules={[
              {
                required: true,
                message: '请选择用户头像!',
              },
            ]}
          />
        </ProForm.Group>
      </ModalForm>

      <ModalForm<API.ModifyPasswordParam>
        title="修改密码"
        trigger={
          <Button danger shape="round" style={{ margin: '10px' }}>
            修改密码
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
          const { userPassword, newPassword } = values;
          if (userPassword === newPassword) {
            message.error('新密码不能与旧密码相同');
            return false;
          }
          //点击了提交
          const isModify = await modifyPassword(values);
          if (isModify) {
            message.success('修改成功');
            // 刷新用户信息表单
            location.reload();
            return true;
          }
          return false;
        }}
      >
        <ProForm.Group>
          <ProFormText.Password
            width="md"
            name="userPassword"
            label="原密码"
            tooltip={'请输入本用户原密码'}
            rules={[{ required: true }, { min: 8, message: '密码不会小于8位' }]}
            placeholder="请输入原密码"
          />
          <ProFormText.Password
            width="md"
            name="newPassword"
            label="新密码"
            tooltip={'请输入新密码，密码不得小于8位'}
            rules={[{ required: true }, { min: 8, message: '新密码小于8位' }]}
            placeholder="请输入新密码"
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
};

export default UserInfo;
