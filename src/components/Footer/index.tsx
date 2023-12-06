import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import {GITEE_LINK, GITHUB_LINK} from "@/constans";
const Footer: React.FC = () => {
  const defaultMessage = 'wen';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'CSDN',
          title: 'CSDN',
          href: 'https://blog.csdn.net/weixin_54620350',
          blankTarget: true,
        },
        {
          key: 'GitHub',
          title: <><GithubOutlined />Github</>,
          href: GITHUB_LINK,
          blankTarget: true,
        },
        {
          key: 'Gitee',
          title: 'Gitee',
          href: GITEE_LINK,
          blankTarget: true,
        },
        {
          key: 'ICP',
          title: '陕ICP备2023018547号-1',
          href: 'http://beian.miit.gov.cn/',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
