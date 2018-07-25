import * as Api from 'api/commentApi'
import { orderBy } from 'lodash'

const state = () => ({
  id: 0,
  type: '',
  sort: 'desc',
  fetchId: 0,
  list: [],
  total: 0,
  noMore: false,
  submitting: false
})

const mutations = {
  RESET_STATE (state) {
    state.id = 0
    state.type = ''
    state.sort = 'desc'
    state.fetchId = 0
    state.list = []
    state.total = 0
    state.noMore = false
    state.submitting = false
  },
  INIT_FETCH_TYPE (state, { type }) {
    state.type = type
    if (type === 'post') {
      state.sort = 'asc'
    }
  },
  SET_MAIN_COMMENTS (state, { comments, seeReplyId, id }) {
    if (!comments.list.length) {
      state.noMore = comments.noMore
      state.total = comments.total
      state.id = id
      return
    }
    const formatComments = comments.list.map(item => {
      // 子评论的 key 是 comments，是个对象，有 list，noMore，total 三个 key
      const childrenCommentList = item.comments.list
      const childrenCommentLength = childrenCommentList.length
      // 在每个子评论对象里里维护一个 maxId，这里默认子评论是 id 增大排序的
      const childrenCommentObj = Object.assign(item.comments, {
        maxId: childrenCommentLength ? childrenCommentList[childrenCommentLength - 1].id : 0
      })
      return Object.assign(item, {
        comments: childrenCommentObj
      })
    })
    // 更新 fetchId，如果是第一页，并且有 seeReplyId，就比较麻烦
    state.fetchId = formatComments[formatComments.length - 1].id
    if (!state.list.length && seeReplyId) {
      state.fetchId = formatComments.map(_ => _.id).filter(_ => _ !== parseInt(seeReplyId, 10)).pop()
    }
    // 操作主评论的 fetchId
    const resIds = formatComments.map(_ => _.id)
    const originList = state.list
    // 对服务端进行一个校准
    const hasNew = !!resIds.filter(_ => originList.map(_ => _.id).indexOf(_) === -1).length
    state.list = state.list.filter(_ => resIds.indexOf(_.id) === -1)
    state.list = orderBy(state.list.concat(formatComments), 'id', state.sort)
    state.noMore = hasNew ? comments.noMore : true
    state.total = hasNew ? comments.total : state.list.length
    state.id = id
  },
  SET_SUB_COMMENTS (state, { comments, parentId }) {
    let parentComment = null
    let parentIndex = 0
    state.list.forEach((item, index) => {
      if (item.id === parentId) {
        parentComment = item
        parentIndex = index
      }
    })
    if (!parentComment) {
      return
    }
    // 更新 maxId
    state.list[parentIndex].comments.maxId = comments.list[comments.list.length - 1].id
    // 返回的 ids
    const resIds = comments.list.map(_ => _.id)
    const parentCommentList = parentComment.comments.list
    // 对服务端进行一个校准
    const hasNew = !!resIds.filter(_ => parentCommentList.map(_ => _.id).indexOf(_) === -1).length
    state.list[parentIndex].comments.list = parentCommentList.filter(_ => resIds.indexOf(_.id) === -1)
    state.list[parentIndex].comments.list = state.list[parentIndex].comments.list.concat(comments.list)
    state.list[parentIndex].comments.noMore = hasNew ? comments.noMore : true
    state.list[parentIndex].comments.total = hasNew ? comments.total : state.list[parentIndex].comments.list.length
  },
  CREATE_MAIN_COMMENT (state, comment) {
    state.sort === 'asc'
      ? state.list.push(comment)
      : state.list.unshift(comment)
    state.total = state.total + 1
  },
  CREATE_SUB_COMMENT (state, { id, comment }) {
    state.list.forEach((item, index) => {
      if (item.id === id) {
        state.list[index].comments.list.push(comment)
        state.list[index].comments.total = state.list[index].comments.total + 1
      }
    })
  },
  SET_SUBMITTING (state, { result }) {
    state.submitting = result
  },
  DELETE_SUB_COMMENT (state, { parentId, id }) {
    state.list.forEach((parent, index) => {
      if (parent.id === parentId) {
        parent.comments.list.forEach((item, subIndex) => {
          if (item.id === id) {
            state.list[index].comments.list.splice(subIndex, 1)
            state.list[index].comments.total = state.list[index].comments.total - 1
          }
        })
      }
    })
  },
  DELETE_MAIN_COMMENT (state, { id }) {
    state.list.forEach((item, index) => {
      if (item.id === id) {
        state.list.splice(index, 1)
        state.total = state.total - 1
      }
    })
  },
  TOGGLE_LIKE_SUB_COMMENT (state, { id, parentId }) {
    state.list.forEach((parent, index) => {
      if (parent.id === parentId) {
        parent.comments.list.forEach((item, subIndex) => {
          if (item.id === id) {
            const result = !state.list[index].comments[subIndex].liked
            state.list[index].comments[subIndex].liked = result
            state.list[index].comments[subIndex].like_count = state.list[index].comments[subIndex].like_count + (result ? 1 : -1)
          }
        })
      }
    })
  },
  TOGGLE_LIKE_MAIN_COMMENT (state, { id }) {
    state.list.forEach((item, index) => {
      if (item.id === id) {
        const result = !state.list[index].liked
        state.list[index].liked = result
        state.list[index].like_count = state.list[index].like_count + (result ? 1 : -1)
      }
    })
  }
}

const actions = {
  async getMainComments ({ state, commit }, { type, id, onlySeeMaster, seeReplyId }) {
    if (state.type && state.id && (state.type !== type || state.id !== id)) {
      commit('RESET_STATE');
    }
    if (state.noMore) {
      return
    }
    commit('INIT_FETCH_TYPE', { type })
    const comments = await Api.getMainCommentList({
      type,
      id,
      onlySeeMaster,
      seeReplyId,
      fetchId: state.fetchId
    })
    commit('SET_MAIN_COMMENTS', { comments, seeReplyId, id })
  },
  async getSubComments ({ state, commit }, { type, parentId }) {
    const store = state.list.filter(_ => _.id === parentId)[0].comments
    if (store.noMore) {
      return
    }
    const comments = await Api.getSubCommentList({
      type,
      parentId,
      maxId: store.maxId
    })
    commit('SET_SUB_COMMENTS', { comments, parentId })
  },
  async createMainComment ({ commit }, { images, content, type, id }) {
    const comment = await Api.createMainComment({
      type, id, content, images
    })
    commit('CREATE_MAIN_COMMENT', comment)
    return comment
  },
  async createSubComment ({ commit }, { id, type, content, targetUserId }) {
    const comment = await Api.createSubComment({
      id, type, content, targetUserId
    })
    commit('CREATE_SUB_COMMENT', { id, comment })
    return comment
  },
  async deleteSubComment ({ commit }, { id, type, parentId }) {
    await Api.deleteSubComment({
      id, type
    })
    commit('DELETE_SUB_COMMENT', { parentId, id })
  },
  async deleteMainComment ({ commit }, { id, type }) {
    await Api.deleteMainComment({
      id, type
    })
    commit('DELETE_MAIN_COMMENT', { id })
  },
  async toggleLikeSubComment ({ commit }, { type, id, parentId }) {
    commit('TOGGLE_LIKE_SUB_COMMENT', { id, parentId })
    await Api.toggleLikeSubComment({
      type,
      id
    })
  },
  async toggleLikeMainComment ({ commit }, { type, id }) {
    commit('TOGGLE_LIKE_MAIN_COMMENT', { id })
    await Api.toggleLikeMainComment({
      type,
      id
    })
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
