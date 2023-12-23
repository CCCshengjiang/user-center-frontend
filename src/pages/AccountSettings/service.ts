import { request } from 'umi';

export async function queryCurrent(): Promise<{ data: API.CurrentUser }> {
  return request('/api/user/updateUser');
}

export async function query() {
  return request('/api/users');
}
