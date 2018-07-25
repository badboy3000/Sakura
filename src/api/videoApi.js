import http from './_baseApi'

export const getVideoInfo = ({ videoId }) => {
  return http.get(`video/${videoId}/show`)
}
