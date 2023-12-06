import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
const Admin: React.FC = (props) => {
  const {children} = props;
  return (
    <PageHeaderWrapper>
      {children}
    </PageHeaderWrapper>
  );
};
export default Admin;
