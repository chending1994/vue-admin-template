import request from '@/utils/request';

export function loginByUsername (username, password) {
  const data = {
    username,
    password,
    type: 1
  };
  return request({
    url: `/cus/login`,
    method: 'post',
    params: data
  });
};

export function logout () {
  return request({
    url: '/login/logout',
    method: 'post'
  });
};

export function getUserInfo () {
  return request({
    url: '/cus/user/info',
    method: 'get'
    // params: { token }
  });
};

export function updatePwd (data) {
  return request({
    url: '/cus/user/cusPassword',
    method: 'post',
    params: data
  });
};

export function getMenus () {
  return request({
    url: '/cus/menu/nav',
    method: 'get'
    // params: { token }
  });
};
