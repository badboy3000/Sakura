import * as Api from 'api/postApi'

export default {
  namespaced: true,
  state: () => ({
    topic: []
  }),
  mutations: {
    SET_TOPIC_POST (state, data) {
      state.topic = data
    }
  },
  actions: {
    async getBangumiTopic ({ commit }, { bangumiId }) {
      const data = await Api.getBangumiTopic(bangumiId);
      commit('SET_TOPIC_POST', data)
    }
  },
  getters: {}
}
