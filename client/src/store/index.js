import { createStore } from "vuex";
const types = {
  SET_AUTHENTICATDE: "SET_AUTHENTICATDE",
  SET_USER: "SET_USER",
};
const state = {
  // isAuthenticaten 是一个布尔值 值当前用户是否已通过身份验证
  isAuthenticaten: false,
  user: {},
};
const getters = {
  isAuthenticaten: (state) => state.isAuthenticaten,
  user: (state) => state.user,
};
const mutations = {
  [types.SET_AUTHENTICATDE](state, isAuthenticaten) {
    if (isAuthenticaten) state.isAuthenticaten = isAuthenticaten;
    else state.isAuthenticaten = false;
  },
  [types.SET_USER](state, user) {
    if (user) state.user = user;
    else state.user = {};
  },
};
const actions = {
  setAuthenticatde: ({ commit }, isAuthenticaten) => {
    commit(types.SET_AUTHENTICATDE, isAuthenticaten);
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user);
  },
  clearCurrentState: ({ commit }) => {
    commit(types.SET_AUTHENTICATDE, false), commit(types.SET_USER, null);
  },
};
export default createStore({
  state,
  getters,
  mutations,
  actions,
});
