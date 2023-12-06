import { PageContainer } from '@ant-design/pro-components';
import { Card, Typography } from 'antd';
import React from 'react';

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          <a
            href="https://www.cwblue.top"
            rel="noopener noreferrer"
            target="__blank"
          >
            欢迎来到wen的用户中心，更多功能敬请期待！
          </a>
        </Typography.Title>
        <div style={{ textAlign: 'center' }}>
          <img src="https://img.soogif.com/cri1FwvJ6OQR4lMNQJwZCQ17UUTdoplQ.gif" alt="欢迎图片" />
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
