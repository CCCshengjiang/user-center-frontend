import { PageContainer } from '@ant-design/pro-components';
import { Card, Typography } from 'antd';
import React from 'react';

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          <a
<<<<<<< HEAD
            href="https://www.cwblue.top"
=======
            href="https://gitee.com/CCCshengjiang"
>>>>>>> c905fcf8b49de85ebc31a0e65dc47ac415be243a
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
