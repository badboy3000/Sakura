import { fetch, meta } from 'api/flowApi'
import { merge } from 'lodash'

const trendingFlowStore = {
  news: {
    list: [],
    total: 0,
    noMore: false,
    nothing: false,
    loading: false
  },
  active: {
    list: [],
    total: 0,
    noMore: false,
    nothing: false,
    loading: false
  },
  hot: {
    list: [],
    total: 0,
    noMore: false,
    nothing: false,
    loading: false
  },
  meta: null
}

const state = () => ({
  bangumiId: 0,
  post: merge({}, trendingFlowStore),
  image: merge({}, trendingFlowStore),
  score: merge({}, trendingFlowStore),
  role: merge({}, trendingFlowStore)
})

const mutations = {
  SET_META (state, { data, type }) {
    state[type].meta = data
  },
  RESET_STATE (state, { type }) {
    state[type] = merge({}, trendingFlowStore)
  },
  PUSH_STATE (state, { data, type, sort, bangumiId, refresh }) {
    const list = refresh
      ? data.list
      : state[type][sort].list.concat(data.list)
    state[type][sort].list = list
    state[type][sort].total = data.total
    state[type][sort].noMore = data.noMore
    state[type][sort].nothing = !list.length
    state[type][sort].loading = false
    state.bangumiId = bangumiId
  },
  SET_LOADING (state, { type, sort }) {
    state[type][sort].loading = true
  }
}

const actions = {
  async getMeta ({ commit }, { type }) {
    const data = await meta({ type })
    commit('SET_META', { data, type })
  },
  async getData ({ state, commit }, { sort, type, take, bangumiId = 0, refresh = false }) {
    if (bangumiId !== state.bangumiId) {
      commit('RESET_STATE', { type })
    }
    if (state[type][sort].noMore || state[type][sort].loading) {
      return
    }
    commit('SET_LOADING', { type, sort })
    let data
    const list = state[type][sort].list
    if (sort === 'news') {
      data = await fetch({
        sort,
        type,
        take,
        minId: refresh ? 0 : list.length ? list[list.length - 1].id : 0,
        bangumiId
      })
    } else {
      data = await fetch({
        sort,
        type,
        take,
        seenIds: refresh ? '' : list.length ? list.map(_ => _.id).toString() : '',
        bangumiId
      })
    }
    commit('PUSH_STATE', { data, type, sort, bangumiId, refresh })
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
