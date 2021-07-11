import Vuex from "vuex";
import db from "./db/db";

export default new Vuex.Store({
  modules: {
    db,
  },
});
