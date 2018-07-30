import * as Api from 'api/roleApi'

export default {
  namespaced: true,
  state: () => ({
    info: null,
    fans: {
      id: 0,
      new: {
        list: [],
        noMore: false
      },
      hot: {
        list: [],
        noMore: false
      }
    }
  }),
  mutations: {
    ADD_ROLE_STATE (state, { hasStar, user }) {
      if (hasStar) {
        state.info.data.hasStar++
      } else {
        state.info.data.hasStar = 1
        state.info.data.fans_count++
        state.fans.new.list.unshift(user)
      }
      state.info.data.star_count++
    },
    SET_ROLE_INFO (state, data) {
      state.info = data
    },
    SET_FANS_LIST (state, { data, roleId, sort }) {
      state.fans.id = roleId
      state.fans[sort].list = state.fans[sort].list.concat(data)
      state.fans[sort].noMore = data.length < 15
    },
    RESET_FANS_LIST (state) {
      state.fans = {
        id: 0,
        new: {
          list: [],
          noMore: false
        },
        hot: {
          list: [],
          noMore: false
        }
      }
    }
  },
  actions: {
    async getFansList ({ state, commit }, { roleId, sort, reset }) {
      if (roleId !== state.fans.id || reset) {
        commit('RESET_FANS_LIST')
      }
      if (state.fans[sort].noMore && !reset) {
        return
      }
      const list = state.fans[sort].list
      const length = list.length
      const data = await Api.fans(Object.assign({
        sort,
        roleId
      }, sort === 'new' ? {
        minId: reset ? 0 : length ? list[length - 1].id : 0
      } : {
        seenIds: reset ? '' : length ? list.map(_ => _.id).toString() : ''
      }))
      commit('SET_FANS_LIST', { data, sort, roleId })
    },
    async getRoleInfo ({ commit }, { roleId }) {
      commit('SET_ROLE_INFO', null)
      const data = await Api.getRoleInfo({ roleId })
      commit('SET_ROLE_INFO', data)
    },
    async star ({ rootState, commit }, { bangumiId, roleId, hasStar }) {
      await Api.star({ bangumiId, roleId })
      const self = rootState.user
      commit('ADD_ROLE_STATE', {
        hasStar,
        user: {
          id: self.id,
          zone: self.zone,
          avatar: self.avatar,
          nickname: self.nickname
        }
      })
    }
  },
  getters: {}
}
