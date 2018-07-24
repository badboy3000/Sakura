import http from './_baseApi'

export const fetch = ({ sort, type, take, minId, seenIds, bangumiId }) => {
  return http.get(`trending/${sort}`, { type, take, minId, seenIds, bangumiId })
}

export const meta = ({ type }) => {
  return http.get('trending/meta', { type })
}
