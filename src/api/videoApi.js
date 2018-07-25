import http from './_baseApi'

export const getVideoInfo = (id) => {
  return http.get(`video/${id}/show`)
}
