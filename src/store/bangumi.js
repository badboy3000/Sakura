import * as Api from 'api/bangumiApi'

export default {
  namespaced: true,
  state: () => ({
    released: [],
    timeline: {
      list: [],
      year: new Date().getFullYear(),
      noMore: false
    },
    category: {
      list: [],
      lastSearchIds: '',
      page: 0,
      take: 10,
      total: 0,
      noMore: false
    },
    tags: [],
    topic: [],
    role: {
      id: 0,
      list: [],
      noMore: false
    },
    cartoon: {
      page: 0,
      take: 12,
      sort: 'desc',
      total: 0,
      list: [],
      noMore: false,
      bangumiId: 0
    }
  }),
  mutations: {
    SET_RELEASED (state, data) {
      state.released = data
    },
    SET_TIMELINE (state, data) {
      const temp = state.timeline
      state.timeline.list = temp.list.concat(data.list)
      state.timeline.year = temp.year - 1
      state.timeline.noMore = data.noMore
    },
    SET_TAGS (state, tags) {
      state.tags = tags.map(_ => {
        return Object.assign(_, {
          selected: false
        })
      })
    },
    CHOICE_TAG (state, id) {
      state.tags.forEach((item, index) => {
        if (item.id === id) {
          state.tags[index].selected = !state.tags[index].selected
        }
      })
    },
    CLEAR_CATEGORY (state) {
      state.category.lastSearchIds = ''
      state.category.list = []
    },
    RESET_CATEGORY (state) {
      state.category.page = 0
      state.category.take = 10
      state.category.total = 0
      state.category.noMore = false
    },
    SET_CATEGORY (state, { data, ids }) {
      if (ids !== state.category.lastSearchIds) {
        state.category.lastSearchIds = ids
        state.category.list = data.list
      } else {
        state.category.list = state.category.list.concat(data.list)
      }
      state.category.noMore = data.noMore
      state.category.total = data.total
      state.category.page++
    },
    SET_TOPIC_POST (state, data) {
      state.topic = data
    },
    SET_BANGUMI_CARTOON (state, { data, bangumiId }) {
      state.cartoon.list = state.cartoon.list.concat(data.list)
      state.cartoon.noMore = data.noMore
      state.cartoon.total = data.total
      state.cartoon.page = state.cartoon.page + 1
      state.cartoon.bangumiId = bangumiId
    },
    REVERSE_CARTOON (state, { sort }) {
      state.cartoon.list = state.cartoon.list.reverse()
      state.cartoon.sort = sort
    },
    RESET_CARTOON (state, { sort }) {
      state.cartoon = {
        page: 0,
        take: 12,
        sort,
        total: 0,
        list: [],
        noMore: false
      }
    },
    // there
    ADD_ROLE_STATE (state, { roleId, hasStar }) {
      state.roles.data.forEach((item, index) => {
        if (item.id === roleId) {
          if (hasStar) {
            state.roles.data[index].has_star++
          } else {
            state.roles.data[index].has_star = 1
            state.roles.data[index].fans_count++
          }
          state.roles.data[index].star_count++
        }
      })
    },
    SET_FOLLOW (state, { followed, self }) {
      state.info.followed = followed
      followed ? state.info.count_like++ : state.info.count_like--
      if (followed) {
        state.info.followers.unshift(self)
      } else {
        state.info.followers.forEach((user, index) => {
          if (user.zone === self.zone) {
            state.info.followers.splice(index, 1)
          }
        })
      }
    },
    SET_ROLES (state, { data, bangumiId }) {
      state.roles.list = data
      state.roles.noMore = true
      state.roles.id = bangumiId
    }
  },
  actions: {
    async getReleased ({ state, commit }) {
      if (state.released.length) {
        return
      }
      const data = await Api.released()
      data && commit('SET_RELEASED', data)
    },
    async getTimeline ({ state, commit }) {
      if (state.timeline.noMore) {
        return
      }
      const data = await Api.timeline({
        year: state.timeline.year
      })
      data && commit('SET_TIMELINE', data)
    },
    async getTags ({ state, commit }) {
      if (state.tags.length) {
        return
      }
      const tags = await Api.tags()
      tags && commit('SET_TAGS', tags)
    },
    async getCategory ({ state, commit }) {
      const ids = state.tags.filter(_ => _.selected).map(_ => _.id).join('-')
      if (!ids) {
        commit('CLEAR_CATEGORY')
        return
      }
      if (ids !== state.category.lastSearchIds) {
        commit('RESET_CATEGORY')
      } else if (state.category.noMore) {
        return
      }
      const data = await Api.category({
        id: ids,
        page: state.category.page,
        take: state.category.take
      })
      data && commit('SET_CATEGORY', { data, ids })
    },
    async getInfo ({ commit }, { bangumiId }) {
      return await Api.getBangumiInfo({ bangumiId })
    },
    async getTopPosts ({ commit }, { ctx, id }) {
      const api = new Api(ctx)
      const data = await api.getTopPosts({ id })
      commit('SET_TOPIC_POST', data)
    },
    async getCartoons ({ state, commit }, { bangumiId, refresh = false }) {
      if (refresh || bangumiId !== state.cartoon.bangumiId) {
        commit('RESET_CARTOON', { sort: state.cartoon.sort })
      }
      const data = await Api.cartoon({
        bangumiId,
        page: state.cartoon.page,
        take: state.cartoon.take,
        sort: state.cartoon.sort
      })
      commit('SET_BANGUMI_CARTOON', { data, bangumiId })
    },
    async changeCartoonSort ({ state, commit }, { bangumiId, sort }) {
      if (state.cartoon.noMore) {
        commit('REVERSE_CARTOON', { sort })
        return
      }
      commit('RESET_CARTOON', { sort })
      const data = await Api.cartoon({
        take: state.cartoon.take,
        page: 0,
        bangumiId,
        sort
      })
      data && commit('SET_BANGUMI_CARTOON', { data, bangumiId })
    },
    // there
    async getRoles ({ state, commit }, { bangumiId, ctx }) {
      if (state.roles.id === bangumiId) {
        return state.roles.data
      }
      const api = new Api(ctx)
      const data = await api.roles({ bangumiId })
      if (data) {
        commit('SET_ROLES', { data, bangumiId })
        return data
      }
    },
    async follow ({ commit, rootState }, { ctx, id }) {
      const api = new Api(ctx)
      const followed = await api.follow(id)
      commit('SET_FOLLOW', {
        followed,
        self: {
          id: rootState.user.id,
          zone: rootState.user.zone,
          avatar: rootState.user.avatar,
          nickname: rootState.user.nickname
        }
      })
    },
    async getPosts ({ state, commit }, { id, take, type, ctx }) {
      if (state.posts.noMore) {
        return
      }
      const posts = state.posts.list
      const api = new Api(ctx)
      const data = await api.posts({
        id,
        take,
        type,
        maxId: posts.length ? posts[posts.length - 1].id : 0
      })
      data && commit('SET_POSTS', data)
    },
    async starRole ({ commit }, { bangumiId, roleId, ctx, hasStar }) {
      const api = new CartoonRoleApi(ctx)
      try {
        await api.star({ bangumiId, roleId })
        commit('ADD_ROLE_STATE', { roleId, hasStar })
      } catch (e) {}
    }
  },
  getters: {}
}
