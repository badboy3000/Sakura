import { fetch, meta } from 'api/trendingApi'
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
  score: merge({}, trendingFlowStore)
})

const mutations = {
  SET_META (state, { data, type }) {
    state[type].meta = data
  },
  INIT_TRENDING_DATA (state, { data, type, sort, bangumiId }) {
    state[type][sort].list = data.list
    state[type][sort].total = data.total
    state[type][sort].noMore = data.noMore
    state[type][sort].nothing = !data.list.length
    state[type][sort].loading = false
    state.bangumiId = bangumiId
  },
  PUSH_TRENDING_DATA (state, { data, type, sort }) {
    const list = state[type][sort].list.concat(data.list)
    state[type][sort].list = list
    state[type][sort].total = data.total
    state[type][sort].noMore = data.noMore
    state[type][sort].nothing = !list.length
    state[type][sort].loading = false
  },
  SET_TRENDING_LOADING (state, { type, sort }) {
    state[type][sort].loading = true
  }
}

const actions = {
  async getMeta ({ commit }, { type }) {
    const data = await meta({ type })
    commit('SET_META', { data, type })
  },
  async getTrending ({ state, commit }, { type, sort, take, bangumiId = 0, refresh = false }) {
    if (state[type][sort].list.length && !refresh && bangumiId === state.bangumiId) {
      return
    }
    if (state[type][sort].loading) {
      return
    }
    commit('SET_TRENDING_LOADING', { type, sort });
    const data = await fetch({
      seenIds: '',
      minId: 0,
      sort,
      take,
      type,
      bangumiId
    });
    commit('INIT_TRENDING_DATA', { data, type, sort, bangumiId })
  },
  async loadMore ({ state, commit }, { sort, type, take, bangumiId = 0 }) {
    if (state[type][sort].noMore || state[type][sort].loading) {
      return
    }
    commit('SET_TRENDING_LOADING', { type, sort })
    let data
    const list = state[type][sort].list
    if (sort === 'news') {
      data = await fetch({
        sort,
        type,
        take,
        minId: list.length ? list[list.length - 1].id : 0,
        bangumiId
      })
    } else {
      data = await fetch({
        sort,
        type,
        take,
        seenIds: list.length ? list.map(_ => _.id).toString() : '',
        bangumiId
      })
    }
    commit('PUSH_TRENDING_DATA', { data, type, sort })
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
