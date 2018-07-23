import http from './_baseApi'

export const getCaptcha = () => {
  return http.get('image/captcha')
}
