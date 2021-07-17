import Vuex from "vuex";
import auth from "./modules/auth.js";
import folders from "./modules/folders.js";

export default new Vuex.Store({
  modules: {
    auth,
    folders,
  },
});
