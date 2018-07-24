import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie';
import BaseApi from 'api/_baseApi.js'
import { refresh } from 'api/userApi.js'
import trending from './trending'
import bangumi from './bangumi'
import world from './trending'
import post from './post'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_LOGGED_USER (state, user) {
      state.user = user
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
    trending,
    bangumi,
    world,
    post
  }
});