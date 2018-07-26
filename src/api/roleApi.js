import http from './_baseApi'

export const star = ({ bangumiId, roleId }) => {
  return http.post(`/bangumi/${bangumiId}/role/${roleId}/star`)
}

export const fans = ({ bangumiId, roleId, seenIds, minId, sort }) => {
  return http.get(`/bangumi/${bangumiId}/role/${roleId}/fans`, {
    params: { seenIds, minId, sort }
  })
}

export const getRoleInfo = ({ roleId }) => {
  return http.get(`/cartoon_role/${roleId}/show`)
}
