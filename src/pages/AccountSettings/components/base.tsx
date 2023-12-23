import React from 'react';
import { message} from 'antd';
import ProForm, { ProFormSelect, ProFormText,} from '@ant-design/pro-form';
import {useRequest} from 'umi';
import { queryCurrent} from '../service';

import styles from './BaseView.less';


// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>

        <ProFormText
          width="md"
          name="avatarUrl"
          label="填写头像url："
        />

  </>
);

const BaseView: React.FC = () => {
  const { data: currentUser, loading } = useRequest(() => {
    return queryCurrent();
  });

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.avatarUrl) {
        return currentUser.avatarUrl;
      }
      return 'https://img0.baidu.com/it/u=3232582821,3516640051&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1703350800&t=3ef9d06db70dfce7ba7535bb6182bf09';
    }
    return 'https://img0.baidu.com/it/u=3232582821,3516640051&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1703350800&t=3ef9d06db70dfce7ba7535bb6182bf09';
  };

  const handleFinish = async () => {
    message.success('更新基本信息成功');
  };
  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                submitButtonProps: {
                  children: '更新基本信息',
                },
              }}
              initialValues={{
                ...currentUser,
                phone: currentUser?.phone.split('-'),
              }}
              hideRequiredMark
            >
              <ProFormText
                width="md"
                name="username"
                label="用户名"
                rules={[
                  {
                    required: true,
                    message: '请输入您的用户名!',
                  },
                ]}
              />
              <ProFormSelect
                width="sm"
                name="gender"
                label="性别"
                rules={[
                  {
                    required: true,
                    message: '请选择您的性别!',
                  },
                ]}
                options={[
                  {
                    label: '男',
                    value: '1',
                  },
                  {
                    label: '女',
                    value: '2',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="phone"
                label="电话"
                rules={[
                  {
                    required: false,
                    message: '请输入您的电话!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="email"
                label="邮箱"
                rules={[
                  {
                    required: false,
                    message: '请输入您的邮箱!',
                  },
                ]}
              />
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
