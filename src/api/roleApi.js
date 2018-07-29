import http from './_baseApi'

export const star = ({ bangumiId, roleId }) => {
  return http.post(`/bangumi/${bangumiId}/role/${roleId}/star`)
}

export const fans = ({ roleId, seenIds, minId, sort }) => {
  return http.get(`/bangumi/0/role/${roleId}/fans`, {
    params: { seenIds, minId, sort }
  })
}

export const getRoleInfo = ({ roleId }) => {
  return http.get(`/cartoon_role/${roleId}/show`)
}
