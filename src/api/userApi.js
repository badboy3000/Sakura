import http from './_baseApi'

export const login = ({ access, secret, remember, geetest }) => {
  return http.post('door/login', {
    access, secret, remember, geetest
  });
};

export const refresh = () => {
  return http.post('door/user');
};

export const sendMessage = ({ phone_number, type, geetest }) => {
  return http.post('door/message', {
    phone_number, type, geetest
  })
};

export const register = ({ access, secret, nickname, authCode, inviteCode }) => {
  return http.post('door/register', {
    access, secret, nickname, authCode, inviteCode
  })
};

export const resetPassword = ({ method, access, authCode, secret }) => {
  return http.post('door/reset', {
    method, access, authCode, secret
  })
};

export const logout = () => {
  return http.post('door/logout')
};