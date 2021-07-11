import Vuex from "vuex";
import auth from "./auth/auth";
import folders from "./folders/folders";

export default new Vuex.Store({
  modules: {
    auth,
    folders,
  },
});
