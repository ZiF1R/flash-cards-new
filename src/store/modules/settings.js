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

    async fetchSettings({ commit, state }) {
      let { general, review } = await _db.getSettings();
      commit("getSettings", { general, review });
    },
  },
  mutations: {
    changeSettings(state, { value, block, property }) {
      state[block][property] = value;
    },

    getSettings(state, { general, review }) {
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

// switch_Changed(settingTitle) {
//   if (/Reversed/i.test(settingTitle)) {
//     this.settings.review.switched = !this.settings.review.switched;
//     const uid = await this.getUid();
//     await firebase
//       .database()
//       .ref(`/users/${uid}/settings`)
//       .set({ ...this.settings });
//     await this.getSettings();
//   }
//   if (/theme/i.test(settingTitle)) {
//     this.settings.general.switchTheme = !this.settings.general.switchTheme;
//     const uid = await this.getUid();
//     await firebase
//       .database()
//       .ref(`/users/${uid}/settings`)
//       .set({ ...this.settings });
//     await this.getSettings();
//   }
// }
// select_Option(choosedOptionData) {
//   let regExpr = /time/i
//   if (regExpr.test(choosedOptionData.listTitle))
//     this.settings.review.timeLimit = choosedOptionData.number
//   else
//     this.settings.review.cardsLimit = choosedOptionData.number
//   const uid = await this.getUid();
//   await firebase
//     .database()
//     .ref(`/users/${uid}/settings`)
//     .set({ ...this.settings });
//   await this.getSettings();
// }
