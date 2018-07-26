import http from './_baseApi'

export const getScoreInfo = ({ scoreId }) => {
  return http.get(`score/${scoreId}/show`)
}

export const bangumiScore = ({ bangumiId }) => {
  return http.get('score/bangumis', { id: bangumiId })
}