import http from './_baseApi'

export const getBangumiTopic = (id) => {
  return http.get(`bangumi/${id}/posts/top`)
}

export const getPostInfo = ({ id, only }) => {
  return http.get(`post/${id}/show`, { only })
}
