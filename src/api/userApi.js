import http from './_baseApi'

export const login = ({ access, secret, remember, geetest }) => {
  return http.post('door/login', {
    access, secret, remember, geetest
  });
};

export const refresh = () => {
  return http.post('door/user');
};