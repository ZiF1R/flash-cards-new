import { _db } from "@/db.js";

export default {
  actions: {
    async fetchUser({ commit }) {
      try {
        commit("updateUser", await _db.getUser());
      } catch (error) {
        return 0;
      }
    },

    async login({ commit }, loginData) {
      let answer;
      try {
        answer = await _db.login(loginData);
      } catch (error) {
        return error.message;
      }

      commit("updateUser", answer);
    },

    async sendUserData({ commit }, data) {
      await _db.sendUserData();
      commit("updateUser", data);
    },
  },
  mutations: {
    updateUser(state, newUserData) {
      state.User = newUserData;
    },
  },
  state: {
    User: {
      Last_name: "",
      Name: "",
      Nickname: "",
      Email: "",
      Password: "",
    },
  },
  getters: {
    getUser({ User }) {
      return User;
    },
  },
};
