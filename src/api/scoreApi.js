import http from './_baseApi'

export const getScoreInfo = ({ scoreId }) => {
  return http.get(`score/${scoreId}/show`)
}