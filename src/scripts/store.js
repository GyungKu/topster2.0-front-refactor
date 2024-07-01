import {createStore} from 'vuex'
import axios from "axios";

// Create a new store instance.
const store = createStore({
  state() {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    // access token이 존재하고, 유효기간이 남았다면
    if (accessToken && Date.now() < accessToken.expire) {
      return {
        token: accessToken.token
      };
    } else {
      return {
        token: null
      }}
    },

  mutations: {
    setToken(state, accessToken) {
      state.token = accessToken;
      return {state};
    },
  },
  actions: {

    setToken({commit}, accessToken) {
      commit('setToken', accessToken);
    },

    logout({commit}) {
      alert('로그아웃 성공');
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      commit("setToken", null);
      axios.defaults.headers.common['Authorization'] = null;
    }
  },

})
export default store;