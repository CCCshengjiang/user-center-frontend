/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import {extend} from 'umi-request';
import {message} from 'antd';
import {history} from 'umi';
import {stringify} from "querystring";
import * as process from "process";

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
<<<<<<< HEAD
  prefix: process.env.NODE_ENV === 'production' ? 'https://user-backend.cwblue.cn' : undefined
=======
  prefix: process.env.NODE_ENV === 'production' ? 'http://user-backend.cwblue.cn' : undefined
>>>>>>> c905fcf8b49de85ebc31a0e65dc47ac415be243a
});

/**
 * 所以请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  console.log(`do request url = ${url}`);
  return {
    url,
    options: {
      ...options,
      headers: {
      },
    },
  };
});

/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response): Promise<any> => {
  const res = await response.clone().json();
  if (res.code == 20000) {
    return res.data;
  }
  if (res.code == 40100) {
    message.error('请先登录');
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: location.pathname,
      })
    });
  }else if (res.code == 40000){
    message.error(res.description);
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: location.pathname,
      })
    });
  }
return res.data;
});

export default request;
