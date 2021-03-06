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
      let answer = "";
      if (loginData.email === "" && loginData.password === "")
        return "Please, fill empty fields!";

      try {
        answer = await _db.login(loginData);
      } catch (error) {
        return error.message;
      }

      commit("updateUser", answer);
    },

    async sendUserData({ commit }, data) {
      commit("updateUser", data);
      await _db.setUserData(data);
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
