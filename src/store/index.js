import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie';
import BaseApi from 'api/_baseApi.js'
import { refresh } from 'api/userApi.js'
import flow from './flow'
import bangumi from './bangumi'
import world from './flow'
import post from './post'
import comment from './comment'
import role from './role'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_LOGGED_USER (state, user) {
      state.user = user
    },
    USE_COIN (state) {
      state.user.coin && state.user.coin--
    },
    UPDATE_USER_INFO (state, { key, value }) {
      state.user[key] = value
    }
  },
  actions: {
    async initialize ({ commit }) {
      const token = Cookies.get('JWT-TOKEN');
      BaseApi.init(token);
      if (!token) {
        return
      }
      try {
        const user = await refresh();
        user && commit('SET_LOGGED_USER', user)
      } catch (e) {}
    }
  },
  getters: {},
  modules: {
    comment,
    flow,
    bangumi,
    world,
    post,
    role
  }
});