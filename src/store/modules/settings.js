/* eslint-disable */
import { _db } from "@/db.js";

export default {
  actions: {
    async selectOption({ commit, state }, { selectedItem, block, property }) {
      commit("changeSettings", { value: selectedItem, block, property });
      await _db.changeSettings({ general: state.general, review: state.review });
    },

    async changeSwitch({ commit, state }, { switchState, block, property }) {
      commit("changeSettings", { value: switchState, block, property });
      await _db.changeSettings({ general: state.general, review: state.review });
    },

    async fetchSettings({ commit }) {
      let settings = await _db.getSettings();
      commit("setSettings", settings);
    },
  },
  mutations: {
    changeSettings(state, { value, block, property }) {
      state[block][property] = value;
    },

    setSettings(state, { general, review }) {
      state.general = general;
      state.review = review;
    },
  },
  state: {
    general: {
      switchTheme: false,
    },
    review: {
      cardsLimit: 5,
      timeLimit: 0,
      switched: false,
    }
  },
  getters: {
    getTimeLimit({review}) {
      return review.timeLimit;
    },
    getCardsLimit({review}) {
      return review.cardsLimit;
    },
    isReviewSwitched({review}) {
      return review.switched;
    },
    isThemeSwitched({general}) {
      return general.switchTheme;
    },
  },
};
