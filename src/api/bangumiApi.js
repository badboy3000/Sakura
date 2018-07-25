import http from './_baseApi'

export const released = () => {
  return http.get('bangumi/released')
}

export const timeline = ({ year }) => {
  return http.get('bangumi/timeline', { year })
}

export const tags = () => {
  return http.get('bangumi/tags')
}

export const category = ({ id, page, take }) => {
  return http.get('bangumi/category', { id, page, take })
}

export const getBangumiInfo = ({ bangumiId }) => {
  return http.get(`bangumi/${bangumiId}/show`)
}

export const videos = ({ bangumiId }) => {
  return http.get(`bangumi/${bangumiId}/videos`)
}

export const cartoon = ({ bangumiId, page }) => {
  return http.get(`bangumi/${bangumiId}/cartoon`, { page })
}
