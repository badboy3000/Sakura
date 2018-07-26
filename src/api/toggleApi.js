import http from './_baseApi'

export const likeApi = ({ type, id }) => {
  return http.post('toggle/like', { type, id })
}

export const rewardApi = ({ type, id }) => {
  return http.post('toggle/reward', { type, id })
}

export const followApi = ({ type, id }) => {
  return http.post('toggle/follow', { type, id })
}

export const markApi = ({ type, id }) => {
  return http.post('toggle/mark', { type, id })
}

export const checkApi = ({ type, id }) => {
  return http.get('toggle/check', {
    params: { type, id }
  })
}
