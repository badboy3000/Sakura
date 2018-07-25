import http from './_baseApi'

export const getCaptcha = () => {
  return http.get('image/captcha')
}


export const getImageInfo = ({ id }) => {
  return http.get(`image/${id}/show`)
}