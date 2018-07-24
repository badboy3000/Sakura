import http from './_baseApi'

export const getBangumiTopic = (id) => {
  return http.get(`bangumi/${id}/posts/top`)
}