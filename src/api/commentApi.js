import http from './_baseApi'

export const getMainCommentList = ({ type, id, fetchId, onlySeeMaster, seeReplyId }) => {
  return http.get(`${type}/comment/${id}/main/list`, { fetchId, onlySeeMaster, seeReplyId })
}

export const getSubCommentList = ({ type, parentId, maxId }) => {
  return http.get(`${type}/comment/${parentId}/sub/list`, { maxId })
}

export const createMainComment = ({ type, id, content, images }) => {
  return http.post(`${type}/comment/${id}/create`, { content, images })
}

export const createSubComment = ({ type, id, content, targetUserId }) => {
  return http.post(`${type}/comment/${id}/reply`, { content, targetUserId })
}

export const deleteSubComment = ({ type, id }) => {
  return http.post(`${type}/comment/delete/sub/${id}`)
}

export const deleteMainComment = ({ type, id }) => {
  return http.post(`${type}/comment/delete/main/${id}`)
}

export const toggleLikeMainComment = ({ type, id }) => {
  return http.post(`${type}/comment/main/toggleLike/${id}`)
}

export const toggleLikeSubComment = ({ type, id }) => {
  return http.post(`${type}/comment/sub/toggleLike/${id}`)
}
