import http from './_baseApi'

export const getBangumiTopic = ({ bangumiId }) => {
  return http.get(`bangumi/${bangumiId}/posts/top`)
}

export const getPostInfo = ({ postId, only }) => {
  return http.get(`post/${postId}/show`, { only })
}
