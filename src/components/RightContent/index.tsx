import { Space } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import HeaderSearch from '../HeaderSearch';
import Avatar from './AvatarDropdown';
import styles from './index.less';
export type SiderTheme = 'light' | 'dark';
const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  if (!initialState || !initialState.settings) {
    return null;
  }
  const { navTheme, layout } = initialState.settings;
  let className = styles.right;
  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="公众号"
        options={[
          {
            label: (
              <a
                href="https://gitee.com/CCCshengjiang/blog-img/raw/master/image/202311301844337.jpg"
                target="_blank"
                rel="noreferrer"
              >
                公众号
              </a>
            ),
            value: '公众号',
          },
          {
            label: (
              <a href="https://gitee.com/CCCshengjiang" target="_blank" rel="noreferrer">
                Gitee
              </a>
            ),
            value: 'Gitee',
          },
          {
            label: (
              <a href="https://github.com/CCCshengjiang" target="_blank" rel="noreferrer">
                Github
              </a>
            ),
            value: 'Github',
          },
        ]}
      />
      <Avatar />
    </Space>
  );
};
export default GlobalHeaderRight;
