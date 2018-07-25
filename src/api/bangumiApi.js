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

export const show = (id) => {
  return http.get(`bangumi/${id}/show`)
}

export const videos = (id) => {
  return http.get(`bangumi/${id}/videos`)
}

export const cartoon = ({ bangumiId, page }) => {
  return http.get(`bangumi/${bangumiId}/cartoon`, { page })
}
