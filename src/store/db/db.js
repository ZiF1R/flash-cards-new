import { _auth } from "@/auth";
import firebase from "firebase/app";

export default {
  actions: {
    async fetchUser({ commit }) {
      let user;
      const uid = await _auth.getUid();
      await firebase
        .database()
        .ref(`/users/${uid}/info`)
        .once("value")
        .then((snapShot) => {
          user = snapShot.toJSON();
        });
      commit("updateUser", user);
    },

    async sendUserData({ commit }, data) {
      const uid = await _auth.getUid();
      await firebase
        .database()
        .ref(`/users/${uid}/info`)
        .set({ ...data });
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
