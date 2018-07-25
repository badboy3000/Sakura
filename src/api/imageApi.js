import http from './_baseApi'

export const getCaptcha = () => {
  return http.get('image/captcha')
}


export const getImageInfo = ({ imageId }) => {
  return http.get(`image/${imageId}/show`)
}